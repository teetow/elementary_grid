import { Node } from "@nick-thompson/elementary/src/core/node";
import { el } from "./elementary";

export const stab = (
  freq: number,
  id: string,
  { gain = 1.0, detune = 0.004, sharpness = 1.3, richness = 1.0 } = {},
) => {
  const tone = (osc: Node, toneGain: number | Node) =>
    el.mul(
      toneGain,
      el.tanh(
        el.add(
          el.sin(el.mul(2 * Math.PI, osc)),
          el.sin(el.mul(3 * Math.PI, osc, 1.2 * sharpness)),
        ),
      ),
    );
  const dry = el.const({
    key: "synth:dry",
    value: gain * (1.0 - 0.5 * Math.pow(richness, 2)),
  });
  const wet = el.const({
    key: "synth:wet",
    value: gain * (Math.sqrt(richness) - 0.3),
  });

  let out = el.add(
    tone(el.phasor(freq * (1 - detune)), wet),
    tone(el.phasor(freq * 1), dry),
    tone(el.phasor(freq * (1 + detune)), wet),
  );

  return el.mul(gain, out);
};
stab.desc = "Not quite a supersaw, but certainly a stabby little rascal";

export const ding = (
  freq: number,
  id: string,
  { gain = 1.0, richness = 0.1, detune = 0.003 } = {},
) => {
  let out = el.add(
    el.mul(
      0.8 * richness,
      el.cycle(el.const({ key: `${id}-L1`, value: 1.0 * freq * (1 - detune) })),
    ),
    el.cycle(el.const({ key: `${id}-C`, value: freq })),
    el.mul(
      0.8 * richness,
      el.cycle(el.const({ key: `${id}-L2`, value: 1.0 * freq * (1 + detune) })),
    ),

    el.mul(
      0.5 * richness,
      el.cycle(
        el.const({ key: `${id}-UL1`, value: 2.0 * freq * (1 - detune * 0.5) }),
      ),
    ),
    el.mul(
      0.5 * richness,
      el.cycle(
        el.const({ key: `${id}-UL2`, value: 2.0 * freq * (1 + detune * 0.5) }),
      ),
    ),
  );

  out = el.mul(out, gain * 3.0);
  out = el.tanh(out);
  out = el.highpass(100, 0.7, out);
  out = el.mul(out, gain * 0.8);

  return out;
};
ding.desc = "Pseudo-FM bell-like patch with a sprinkle of unpredictability";

export const bass = (
  freq: number,
  gate: Node,
  { gain = 1.0, richness = 1.0 } = {},
) => {
  let osc = el.mul(el.blepsaw(freq), 0.9);

  let octaves = el.add(
    el.mul(0.5 * richness, el.cycle(el.mul(freq, 2.03))),
    el.mul(0.5 * richness, el.cycle(el.mul(freq, 2.97))),
  );
  osc = el.add(osc, octaves);
  osc = el.highpass(el.mul(1, freq), 8.0, osc);
  osc = el.min(2.0, osc);

  const fltEnv = el.add(1.0, el.mul(5, el.adsr(0.001, 0.3, 0.001, 0.5, gate)));
  const fltVal = el.mul(3.0, freq, fltEnv);
  const qEnv = el.add(1.0, el.mul(3.0, el.adsr(0.5, 0.1, 0.001, 0.1, gate)));
  osc = el.lowpass(fltVal, qEnv, osc);

  osc = el.mul(0.35 * gain, osc);

  return osc;
};
bass.desc = "BASS";

export const kick = (
  gate: Node,
  { freq = 42, speed = 1.0, pop = 1.0, tail = 1.0 } = {},
) => {
  let fastEnv = el.adsr(0.0001, 0.2 * speed, 0.0, 0.0, gate);
  let slowEnv = el.adsr(0.0001, 0.5, 0.0, 0.0, gate);

  let pitchEnv = el.add(1.0, el.mul(3 * pop, fastEnv));
  pitchEnv = el.add(0.0, el.mul(0.5 * pop, slowEnv), pitchEnv);

  let out = el.cycle(el.mul(pitchEnv, freq));

  let ampEnv = el.adsr(0.03, 0.23 * speed, 0.0, 0.0, gate);
  out = el.tanh(el.mul(1.0, ampEnv, out));

  let snapEnv = el.adsr(0.001, 0.01, 0.0, 0.0, gate);
  let snap = el.cycle(el.mul(snapEnv, 3000));
  let snapFltEnv = el.adsr(0.005, 0.1, 0, 0, gate);
  snap = el.lowpass(el.add(110, el.mul(1200, snapFltEnv)), 1, snap);
  out = el.add(el.mul(0.4, snap), out);

  out = el.highpass(freq + 14, tail * 5.0, out);
  out = el.tanh(out);

  return out;
};
