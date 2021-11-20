import { el } from "@nick-thompson/elementary";
import { clamp, range, tempoToMs } from "./utils";

import { ding, kick, stab } from "./tones";

const tones = {
  stab: stab,
  ding: ding,
  kick: kick,
};

/**
 * @typedef {Object} Props
 * @property {number[][]} tracks
 * @property {Function} tone
 * @property {number[]} scale
 * @property {Object} tick
 * @property {Object} sync
 */

/**
 *
 * @param {Props} props
 * @returns {Object} An Elementary node
 */
export const synth = ({ tracks, tone, scale, tick, sync }) => {
  const seq = (i) =>
    el.seq(
      { key: `${i}:seq`, seq: tracks[i], loop: false },
      tick.current,
      sync.current
    );
  const env = (i) => el.adsr(0.01, 0.3, 0.1, 1.0, seq(i));
  const osc = (freq) => tones[tone](freq, { gain: 0.8 });
  const voice = (i) => osc(scale[i]);
  const patch = (i) => el.mul(env(i), voice(i));

  return el.add(
    el.add(range(4, 0).map(patch)),
    el.add(range(4, 4).map(patch)),
    el.add(range(4, 8).map(patch)),
    el.add(range(4, 12).map(patch))
  );
};

export const fx = (node, bpm = 120, balance = 1.0) => {
  let dly = el.delay(
    { size: 44100 },
    el.ms2samps(3 * tempoToMs(bpm, 16)),
    -0.3,
    node
  );

  return el.add(el.mul(node, clamp(2 - balance)), el.mul(dly, balance, 0.5));
};

export const drums = (beat) => {
  return kick(beat.current, { pop: 1.3 });
};

export const master = (node, tick, beat, sync) => {
  return el.add(
    el.mul(0, tick.current),
    el.mul(0, beat.current),
    el.mul(0, sync.current),
    node
  );
};
