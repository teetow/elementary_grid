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
  { gain = 1.0, detune = 0.007, sharpness = 1.0, richness = 1.0 } = {}
) => {
  const tone = (t, toneGain) =>
    el.mul(
      toneGain,
      el.add(
        el.sin(el.mul(2 * Math.PI, t)),
        el.sin(el.mul(3 * Math.PI, t, 0.1 * sharpness))
      )
    );
  let out = el.add(
    el.mul(tone(el.phasor(freq * (1 - detune)), 0.5 * richness)),
    el.mul(tone(el.phasor(freq * 1), 0.8)),
    el.mul(tone(el.phasor(freq * (1 + detune)), 0.5 * richness))
  );

  out = el.tanh(out);
  out = el.highpass(60, 1.0, out);

  return el.mul(gain * 2, out);
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
  { gain = 1.0, richness = 1.0, detune = 0.004 } = {}
) => {
  let osc = el.add(
    el.cycle(freq * (1 - detune)),
    el.mul(0.5 * richness, el.cycle(2 * freq * (1 - detune * 0.5))),
    el.mul(0.5 * richness, el.cycle(2 * freq * (1 + detune * 0.5))),
    el.cycle(freq * (1 + detune))
  );

  osc = el.highpass(200, 1.0, osc);
  osc = el.mul(osc, gain * 2);
  osc = el.tanh(osc);

  return osc;
};
ding.desc = "Pseudo-FM bell-like patch with a sprinkle of unpredictability";

/**
 * @typedef {Object} KickProps
 * @property {number} [freq]
 * @property {number} [pop]
 * @property {number} [speed]
 * */

/**
 *
 * @param {Object} gate
 * @param {Kickprops} [props]
 */
export const kick = (
  gate,
  { freq = 45, speed = 1.0, pop = 1.0, tail = 1.0 } = {}
) => {
  let ampEnv = el.adsr(0.005, 0.3 * speed, 0.0, 0.0, gate);
  let fastEnv = el.adsr(0.0001, 0.2 * speed, 0.0, 0.0, gate);
  let slowEnv = el.adsr(0.0001, 0.5, 0.0, 0.0, gate);

  let pitch = el.add(1.0, el.mul(3 * pop, fastEnv));
  pitch = el.add(0.0, el.mul(0.5 * pop, slowEnv), pitch);

  let out = el.cycle(el.mul(pitch, freq));

  out = el.tanh(el.mul(1.8, ampEnv, out));
  out = el.highpass(freq + 10, tail * 6.0, out);
  out = el.tanh(out);

  return out;
};
