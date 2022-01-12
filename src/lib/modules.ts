import srvb from "@elemaudio/srvb";
import { el } from "@nick-thompson/elementary";
import { Node } from "@nick-thompson/elementary/src/core/node";
import { MutableRefObject } from "react";

import { bass, ding, kick, stab } from "./tones";
import { clamp, range, tempoToMs } from "./utils";

const tones: Record<string, Function> = {
  stab: stab,
  ding: ding,
  bass: bass,
  kick: kick,
};

type SynthParams = {
  tracks: number[][];
  tone: string;
  scale: number[];
  tick: MutableRefObject<Node>;
  sync: MutableRefObject<Node>;
};
export const synth = ({ tracks, tone, scale, tick, sync }: SynthParams) => {
  const seq = (i: number) =>
    el.seq(
      { key: `synth:${i}:seq`, seq: tracks[i], loop: false },
      tick.current,
      sync.current,
    );
  const env = (i: number) => el.adsr(0.02, 0.3, 0.1, 0.9, seq(i));
  const osc = (freq: number) => tones[tone](freq, { gain: 0.8 });
  const voice = (i: number) => osc(scale[i]);
  const patch = (i: number) => el.mul(env(i), voice(i));

  const out = range(scale.length).reduce((prev, cur) => {
    return el.add(prev, patch(cur));
  }, patch(0)) as unknown as Node;
  return out;
};

type BassSynthParams = {
  tracks: number[][];
  scale: number[];
  tick: MutableRefObject<Node>;
  sync: MutableRefObject<Node>;
  legato?: boolean;
};

export const bassSynth = ({
  tracks,
  scale,
  tick,
  sync,
  legato = false,
}: BassSynthParams) => {
  const numSteps = tracks[0].length;
  const bassTriggers = Array(numSteps).fill(0);
  let bassFreqs = Array(numSteps).fill(0);

  tracks.forEach((track, trackIndex) =>
    track.forEach((step, stepIndex) => {
      if (step === 1) {
        bassTriggers[stepIndex] = 1;
        bassFreqs[stepIndex] = scale[trackIndex];
      }
    }),
  );

  bassFreqs = bassFreqs.filter((f) => f > 0);

  const bassSeq = el.seq(
    { key: "bass:trig", seq: bassTriggers, hold: legato, loop: false },
    tick.current,
    sync.current,
  );
  const ampEnv = el.adsr(0.03, 0.4, 0.6, 0.5, bassSeq);

  const pitchSeq = el.seq(
    { key: "bass:freq", seq: bassFreqs, hold: true, loop: false },
    bassSeq,
    sync.current,
  );

  const osc = tones.bass(pitchSeq, bassSeq, { gain: 0.8 });

  const out = el.mul(ampEnv, osc);
  return out;
};

export const msDelay = (node: Node, time = 210, balance = 1.0) => {
  let dly = el.delay({ size: 44100 }, el.ms2samps(time), -0.3, node);

  return el.add(el.mul(node, clamp(2 - balance)), el.mul(dly, balance, 0.5));
};

export const delay = (node: Node, bpm = 120, tap = 3, balance = 1.0) =>
  msDelay(node, tap * tempoToMs(bpm, 16), balance);

export const pingDelay = (
  left: Node,
  right: Node,
  bpm = 120,
  balance = 1.0,
) => [delay(left, bpm, 2, balance), delay(right, bpm, 3, balance)];

/**
 *
 * @param {Object} gate -- an el.metro gate node
 */

export const drums = (gate: MutableRefObject<Node>) => {
  return kick(gate.current, { pop: 1.2 });
};

export const verb = (left: Node, right: Node, verbGain: number = 0.3) => {
  let [wetL, wetR] = srvb(
    { name: "verb" },
    0.5,
    0.5,
    0.5,
    el.mul(verbGain, left),
    el.mul(verbGain, right),
  );

  return [wetL, wetR];
};

export const master = (
  tick: MutableRefObject<Node>,
  beat: MutableRefObject<Node>,
  sync: MutableRefObject<Node>,
  gain: number = 1.0,
  left: Node,
  right: Node,
) => {
  left = el.highpass(70, 0.7, left);
  right = el.highpass(70, 0.7, right);
  let [outL, outR] = [el.mul(gain, left), el.mul(gain, right)];

  const metros = el.add(
    el.mul(0, tick.current),
    el.mul(0, beat.current),
    el.mul(0, sync.current),
  );
  outL = el.add(outL, metros);

  return [outL, outR];
};
