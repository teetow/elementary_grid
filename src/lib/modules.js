import { el } from "@nick-thompson/elementary";

import { bass, ding, kick, stab } from "./tones";
import { clamp, range, tempoToMs } from "./utils";

const tones = {
  stab: stab,
  ding: ding,
  bass: bass,
  kick: kick,
};

/**
 * @typedef {Object} Props
 * @property {number[][]} tracks
 * @property {string} tone
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
      { key: `synth:${i}:seq`, seq: tracks[i], loop: false },
      tick.current,
      sync.current
    );
  const env = (i) => el.adsr(0.02, 0.3, 0.1, 0.9, seq(i));
  const osc = (freq) => tones[tone](freq, { gain: 0.8 });
  const voice = (i) => osc(scale[i]);
  const patch = (i) => el.mul(env(i), voice(i));

  const out = range(scale.length).reduce((prev, cur) => {
    if (prev === 0) {
      return el.add(patch(prev), patch(cur));
    }
    return el.add(prev, patch(cur));
  });
  return out;
};

/**
 *
 * @typedef BassSynthParams
 * @property {number[][]} tracks
 * @property {Object} scale
 * @property {Object} tick
 * @property {boolean} legato
 */

/**
 * @param {BassSynthParams} Params
 */
export const bassSynth = ({ tracks, scale, tick, sync, legato = false }) => {
  const numSteps = tracks[0].length;
  const bassSeq = Array(numSteps).fill(0);
  const bassFreqs = Array(numSteps).fill(scale[0]);

  tracks.forEach((track, trackIndex) =>
    track.forEach((step, stepIndex) => {
      if (step === 1) {
        bassSeq[stepIndex] = 1;
        bassFreqs[stepIndex] = scale[trackIndex];
      }
    })
  );

  const ampEnv = el.adsr(
    0.008,
    0.4,
    0.6,
    0.3,
    el.seq(
      { key: `bass:gate`, seq: bassSeq, hold: legato, loop: false },
      tick.current,
      sync.current
    )
  );

  const pitchSeq = el.seq(
    { key: "bass:freq", seq: bassFreqs, hold: true, loop: false },
    tick.current,
    sync.current
  );

  const osc = tones.bass(pitchSeq, { gain: 0.8 });

  const out = el.mul(ampEnv, osc);
  return out;
};

export const fx = (node, bpm = 120, balance = 1.0) => {
  let dly = el.delay(
    { size: 1000 },
    el.ms2samps(3 * tempoToMs(bpm, 16)),
    -0.3,
    node
  );

  return el.add(el.mul(node, clamp(2 - balance)), el.mul(dly, balance, 0.5));
};

/**
 *
 * @param {Object} gate -- an el.metro gate node
 */
export const drums = (gate) => {
  return kick(gate.current, { pop: 1.2 });
};

export const master = (node, tick, beat, sync, gain = 1.0) => {
  let out = el.mul(
    gain * 1.0,
    el.add(
      el.mul(0, tick.current),
      el.mul(0, beat.current),
      el.mul(0, sync.current),
      node
    )
  );
  out = el.highpass(70, 0.7, out);
  return out;
};
