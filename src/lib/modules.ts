import { el } from "@elemaudio/core";
import { ElemNode } from "../types/elemaudio__core";
import { kick, Tones } from "./tones";
import { clamp, freqDeltaFromSeq, tempoToMs } from "./utils";

const legatoize = (freqs: number[]) => {
  for (let i = 0; i < freqs.length * 2; i++) {
    let c = i % freqs.length;
    let p = (i + freqs.length - 1) % freqs.length;
    if (freqs[c] === 0) {
      freqs[c] = freqs[p];
    }
  }
  return freqs;
};

type SynthParams = {
  tracks: number[][];
  tone: string;
  scale: number[];
  tick: ElemNode;
  sync: ElemNode;
  gain: number;
};
export const synth = ({
  tracks,
  tone,
  scale,
  tick,
  sync,
  gain = 1.0,
}: SynthParams) => {
  const makeTrigSeq = (track: number[], trackIndex: number) => {
    let trigSeq = el.seq2(
      {
        key: `synth:${trackIndex}:trig`,
        seq: track.map((x) => (x !== 0 ? 1 : 0)),
        loop: false,
        hold: false,
      },
      tick,
      sync,
    );

    return trigSeq;
  };

  const makeFreqSeq = (track: number[], trackIndex: number) => {
    let freqs = track.map((trig) =>
      trig !== 0 ? freqDeltaFromSeq(trig, scale[trackIndex]) : 0,
    );

    freqs = legatoize(freqs);

    let freqSeq = el.seq2(
      {
        key: `synth:${trackIndex}:freq`,
        seq: freqs.length > 0 ? freqs : [0],
        loop: false,
        hold: true,
      },
      tick,
      sync,
    );

    return freqSeq;
  };

  const osc = (seq: ElemNode, trigSeq: ElemNode, i: number) =>
    Tones[tone](seq, trigSeq, `synth:voice${i}:freq`, { gain: 0.5 * gain });

  let out = tracks.reduce((stack, track, trackIndex) => {
    const trigSeq = makeTrigSeq(track, trackIndex);
    const freqSeq = makeFreqSeq(track, trackIndex);

    return el.add(stack, osc(freqSeq, trigSeq, trackIndex));
  }, el.const({ value: 0 }));

  return out;
};

type BassSynthParams = {
  tracks: number[][];
  scale: number[];
  tick: ElemNode;
  sync: ElemNode;
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
      if (step !== 0) {
        bassTriggers[stepIndex] = 1;
        bassFreqs[stepIndex] = freqDeltaFromSeq(step, scale[trackIndex]);
      }
    }),
  );

  bassFreqs = legatoize(bassFreqs);

  const bassSeq = el.seq2(
    {
      key: "bass:trig",
      seq: bassTriggers.length > 0 ? bassTriggers : [0],
      hold: legato,
      loop: false,
    },
    tick,
    sync,
  );
  const ampEnv = el.adsr(0.03, 0.4, 0.6, 0.5, bassSeq);

  const pitchSeq = el.seq2(
    {
      key: "bass:freq",
      seq: bassFreqs.length > 0 ? bassFreqs : [0],
      hold: true,
      loop: false,
    },
    tick,
    sync,
  );

  const osc = Tones.bass(pitchSeq, bassSeq, "bass", { gain: 0.6 });

  const out = el.mul(ampEnv, osc);
  return out;
};

export const msDelay = (node: ElemNode, time = 210, balance = 1.0) => {
  let dly = el.delay({ size: 88200 }, el.ms2samps(time), -0.3, node);

  return el.add(el.mul(node, clamp(2 - balance)), el.mul(dly, balance, 0.5));
};

export const delay = (node: ElemNode, bpm = 120, tap = 3, balance = 1.0) =>
  msDelay(node, tap * tempoToMs(bpm, 16), balance);

export const pingDelay = (
  left: ElemNode,
  right: ElemNode,
  bpm = 120,
  balance = 0.8,
) => [delay(left, bpm, 2, balance), delay(right, bpm, 3, balance)];

export const drums = (trig: ElemNode) => {
  return kick(el.const({ value: 0 }), trig, "kick", { gain: 0.8, pop: 1.2 });
};

export const master = (
  gain: number = 1.0,
  left: ElemNode,
  right: ElemNode,
  lowcut = 40,
  lowq = 0.9,
  crunch = 0.5,
) => {
  [left, right] = [el.mul(crunch, left), el.mul(crunch, right)];
  [left, right] = [el.tanh(left), el.tanh(right)];
  [left, right] = [el.mul(1 / crunch, left), el.mul(1 / crunch, right)];

  [left, right] = [
    el.highpass(lowcut, lowq, left),
    el.highpass(lowcut, lowq, right),
  ];

  [left, right] = [el.mul(gain, left), el.mul(gain, right)];

  return [left, right];
};
