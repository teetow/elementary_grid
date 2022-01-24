import { el, Node } from "@elemaudio/core";

export type Tone = ((
  freqs: Node,
  trigs: Node,
  id: string,
  options?: { gain?: number } & any,
) => Node) & { desc: string };

export const DoricoBeep: Tone = (freqs) => {
  return el.phasor(freqs);
};
DoricoBeep.desc = "It melts";

export const stab: Tone & {
  id?: string;
  options?: {
    gain: number;
    detune: number;
    sharpness: number;
    richness: number;
  };
} = (
  freqs,
  trigs,
  id,
  { gain = 1.0, detune = 0.004, sharpness = 1.3, richness = 0.7 } = {},
) => {
  const tone = (osc: Node, detune: number, toneGain: Node) => {
    const o = el.phasor(el.mul(osc, detune));
    return el.mul(
      toneGain,
      el.add(
        el.sin(el.mul(2 * Math.PI, o)),
        el.sin(el.mul(3 * Math.PI, o, 1.2 * sharpness)),
      ),
    );
  };

  const dry = el.const({
    key: `synth:${id}:dry`,
    value: gain * (1.0 - 0.5 * Math.pow(richness, 2)),
  });

  const wet = el.const({
    key: `synth:${id}:wet`,
    value: gain * (Math.sqrt(richness) - 0.3),
  });

  let out = el.add(
    tone(freqs, 1 - detune, wet),
    tone(freqs, 1, dry),
    tone(freqs, 1 + detune, wet),
  );

  let env = el.adsr(0.01, 0.3, 0.3, 0.8, trigs);

  return el.mul(out, 0.66, gain, env);
};
stab.desc = "Not quite a supersaw, but certainly a stabby little rascal";

export const ding: Tone = (
  freqs,
  trigs,
  id,
  { gain = 1.0, richness = 1.0, detune = 0.005, crunch = 1.0 },
) => {
  const osc = (key: string, pitchMod: number) =>
    el.mul(freqs, el.const({ key: key, value: pitchMod }));

  let out = el.add(
    el.mul(0.8 * richness, el.cycle(osc(`${id}-L1`, 1 - detune))),
    el.cycle(freqs),
    el.mul(0.8 * richness, el.cycle(osc(`${id}-L2`, 1 + detune))),

    el.mul(0.5 * richness, el.cycle(osc(`${id}-UL1`, 1 - detune * 0.5))),
    el.mul(0.5 * richness, el.cycle(osc(`${id}-UL2`, 1 - detune * 0.5))),
  );

  out = el.mul(out, gain, crunch * 5);
  out = el.tanh(out);
  out = el.highpass(100, 0.7, out);
  out = el.mul(out, gain, 1.3 - crunch * 0.7);

  let resEnv = el.add(0.2, el.mul(1.1, el.adsr(0.05, 0.3, 0.1, 0.1, trigs)));
  out = el.lowpass(el.mul(8.0, freqs), resEnv, out);

  let env = el.adsr(0.01, 0.3, 0.1, 0.9, trigs);
  return el.mul(out, env);
};
ding.desc = "Pseudo-FM bell-like patch with a sprinkle of unpredictability";

export const bell: Tone & {
  id?: string;
  options?: {
    gain: number;
    detune: number;
    richness: number;
  };
} = (freqs, trigs, id, { gain = 1.0, detune = 0.0025, richness = 1 }) => {
  const osc = (freqs: Node, gain: number, env: Node, octave = 1) => {
    return el.mul(gain, env, el.sin(el.mul(2.0 * octave * Math.PI, freqs)));
  };

  const phasorDown = el.phasor(el.mul(freqs, 1 - detune));
  const phasorMid = el.phasor(freqs);
  const phasorUp = el.phasor(el.mul(freqs, 1 + detune));

  const medEnv = el.adsr(0.8, 0.3, 0.1, 0.2, trigs);
  const fastEnv = el.adsr(0.5, 0.4, 0.2, 1.2, trigs);
  const transientEnv = el.adsr(0.001, 0.5, 0.3, 0.9, trigs);

  return el.mul(
    gain,
    el.tanh(
      el.add(
        // fundamental
        osc(phasorMid, 0.4, medEnv),

        // harmonics
        osc(phasorDown, 0.25 * richness, fastEnv, 2.0),
        osc(phasorUp, 0.25 * richness, fastEnv, 2.0),

        osc(phasorDown, 0.12 * richness, transientEnv, 8.0),
        osc(phasorUp, 0.12 * richness, transientEnv, 8.0),
      ),
    ),
  );
};
bell.desc = "Sparkly to a fault";

export const bass: Tone = (
  freqs: Node,
  trigs: Node,
  id,
  { gain = 1.0, richness = 1.0 },
) => {
  let osc = el.mul(el.blepsaw(freqs), 0.9);

  let octaves = el.add(
    el.mul(0.5 * richness, el.cycle(el.mul(freqs, 2.03))),
    el.mul(0.5 * richness, el.cycle(el.mul(freqs, 2.97))),
  );
  osc = el.add(osc, octaves);
  osc = el.highpass(el.mul(1.05, freqs), 7.0, osc);
  osc = el.min(2.0, osc);

  const fltEnv = el.add(0.9, el.mul(5, el.adsr(0.001, 0.3, 0.001, 0.5, trigs)));
  const fltVal = el.mul(4.0, freqs, fltEnv);
  const qEnv = el.add(1.0, el.mul(3.0, el.adsr(0.5, 0.1, 0.001, 0.1, trigs)));
  osc = el.lowpass(fltVal, qEnv, osc);

  osc = el.mul(0.27 * gain, osc);

  return osc;
};
bass.desc = "BASS";

export const kick: Tone = (
  freqs: Node,
  trigs: Node,
  id,
  { freq = 42, speed = 1.0, pop = 1.0, tail = 1.0, gain = 1.0 },
) => {
  let fastEnv = el.adsr(0.0001, 0.2 * speed, 0.0, 0.0, trigs);
  let slowEnv = el.adsr(0.0001, 0.5, 0.0, 0.0, trigs);

  let pitchEnv = el.add(1.0, el.mul(3 * pop, fastEnv));
  pitchEnv = el.add(0.0, el.mul(0.5 * pop, slowEnv), pitchEnv);

  let out = el.cycle(el.mul(pitchEnv, freq));

  let ampEnv = el.adsr(0.03, 0.23 * speed, 0.0, 0.0, trigs);
  out = el.mul(ampEnv, out);

  let snapEnv = el.adsr(0.001, 0.01, 0.0, 0.0, trigs);
  let snap = el.cycle(el.mul(snapEnv, 3000));
  let snapFltEnv = el.adsr(0.005, 0.1, 0, 0, trigs);
  snap = el.lowpass(el.add(110, el.mul(1200, snapFltEnv)), 1, snap);
  out = el.add(el.mul(0.4, snap), out);

  out = el.highpass(freq + 14, tail * 6.0, out);

  out = el.mul(gain, out);

  return out;
};
kick.desc = "A thumper, for sure";

export const Tones: Record<string, Tone> = {
  stab: stab,
  ding: ding,
  beep: DoricoBeep,
  bell: bell,
  bass: bass,
  kick: kick,
};
