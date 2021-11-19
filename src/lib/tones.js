import { el } from "@nick-thompson/elementary";

export const pluck = (freq, gain, detune = 0.005) => {
  const tone = (t, gain) =>
    el.mul(
      gain,
      el.add(
        el.sin(el.mul(2 * Math.PI, t)),
        el.sin(el.mul(3 * Math.PI, t, 0.05))
      )
    );

  return el.mul(
    gain,
    el.add(
      el.mul(tone(el.phasor(freq * (1 - detune)), 0.3)),
      el.mul(tone(el.phasor(freq * 1), 0.5)),
      el.mul(tone(el.phasor(freq * (1 + detune)), 0.3))
    )
  );
};
pluck.desc = "Not quite a supersaw, but certainly a plucky little rascal";

/**
 * @param {*} freq
 * @param {*} gain
 * @param {*} detune
 * @returns
 */
export const ding = (freq, gain, detune = 0.005) => {
  const richness = 0.5;
  return el.tanh(
    el.mul(
      gain * 2.5,
      el.add(
        el.mul(0.7 * richness, el.cycle(freq * (1 - (detune * 1.5)))),
        el.mul(0.9 * richness, el.cycle(freq * (1 - detune))),
        el.mul(1.2, el.cycle(freq)),
        el.mul(0.9 * richness, el.cycle(freq * (1 + detune))),
        el.mul(0.7 * richness, el.cycle(freq * (1 + (detune * 1.5))))
      )
    )
  );
};
ding.desc = "Pseudo-FM bell-like patch with a sprinkle of unpredictability";

/**
 * @typedef {Object} KickProps
 * @property {number} gate
 * @property {number} freq
 * @property {number} pop
 * @property {number} speed
 * */

/**
 *
 * @param {Kickprops} props
 */
export const kick = ({ gate, freq = 50, speed = 1.0, pop = 1.0 }) => {
  let ampEnv = el.adsr(0.005, 0.3 * speed, 0.0, 0.0, gate);
  let fastEnv = el.adsr(0.0001, 0.2 * speed, 0.0, 0.0, gate);
  let slowEnv = el.adsr(0.0001, 0.5, 0.0, 0.0, gate);

  let pitch = el.add(1.0, el.mul(2 * pop, fastEnv));
  pitch = el.add(0.0, el.mul(0.5 * pop, slowEnv), pitch);

  let osc = el.cycle(el.mul(pitch, freq));

  let out = el.tanh(el.mul(1.5, ampEnv, osc));
  out = el.highpass(freq, 8.4, out);

  return out;
};
