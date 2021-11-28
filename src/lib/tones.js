import { el } from "@nick-thompson/elementary";

/**
 * @typedef {Object} PluckProps
 * @property {number} [detune]
 * @property {number} [sharpness]
 * */

/**
 *
 * @param {number} freq
 * @param {PluckProps} props
 */
export const stab = (
  freq,
  { gain = 1.0, detune = 0.004, sharpness = 1.0, richness = 1.0 } = {}
) => {
  const tone = (freq, toneGain) =>
    el.mul(
      toneGain,
      el.add(
        el.sin(el.mul(2 * Math.PI, freq)),
        el.sin(el.mul(3 * Math.PI, freq, 0.08 * sharpness))
      )
    );
  let out = el.add(
    tone(el.phasor(freq * (1 - detune)), 0.5 * richness),
    tone(el.phasor(freq * 1), 0.8),
    tone(el.phasor(freq * (1 + detune)), 0.5 * richness)
  );

  return el.mul(gain, out);
};
stab.desc = "Not quite a supersaw, but certainly a stabby little rascal";

/**
 * @typedef {Object} DingProps
 * @property {number} [gain]
 * @property {number} [richness]
 * @property {number} [detune]
 */

/**
 * @param {number} freq
 * @param {DingProps} [props]
 */
export const ding = (
  freq,
  { gain = 1.0, richness = 0.1, detune = 0.003 } = {}
) => {
  let osc = el.add(
    el.mul(0.8 * richness, el.cycle(1.0 * freq * (1 - detune))),
    el.cycle(freq),
    el.mul(0.8 * richness, el.cycle(1.0 * freq * (1 + detune))),

    el.mul(0.5 * richness, el.cycle(2.0 * freq * (1 - detune * 0.5))),
    el.mul(0.5 * richness, el.cycle(2.0 * freq * (1 + detune * 0.5)))
  );

  osc = el.mul(osc, gain * 3.0);
  osc = el.tanh(osc);
  osc = el.highpass(100, 0.7, osc);
  osc = el.mul(osc, gain * 0.8);

  return osc;
};
ding.desc = "Pseudo-FM bell-like patch with a sprinkle of unpredictability";

/**
 * @typedef {Object} BassProps
 * @property {number} [gain]
 * @property {number} [richness]
 */

/**
 * @param {number} freq
 * @param {BassProps} [props]
 */
export const bass = (freq, { gain = 1.0, richness = 1.0 } = {}) => {
  let osc = el.mul(el.blepsaw(freq), 0.9);

  let octaves = el.add(
    el.mul(0.5 * richness, el.cycle(el.mul(freq, 2.02))),
    el.mul(0.5 * richness, el.cycle(el.mul(freq, 2.98)))
  );
  osc = el.add(osc, octaves);
  osc = el.highpass(el.mul(1, freq), 5.0, osc);
  osc = el.min(2.0, osc);
  osc = el.lowpass(el.mul(4, freq), 0.8, osc);
  osc = el.mul(0.5 * gain, osc);

  return osc;
};
bass.desc = "BASS";

/**
 * @typedef {Object} KickProps
 * @property {number} [freq]
 * @property {number} [pop]
 * @property {number} [speed]
 * @property {number} [tail]
 */

/**
 *
 * @param {Object} gate
 * @param {Kickprops} [props]
 */
export const kick = (
  gate,
  { freq = 42, speed = 1.0, pop = 1.0, tail = 1.0 } = {}
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
