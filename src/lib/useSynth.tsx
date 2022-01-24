import { el, ElementaryWebAudioRenderer as core } from "@elemaudio/core";
import { useCallback, useEffect } from "react";
import { bassSynth, drums, master, pingDelay, synth } from "./modules";
import { bpmToHz, tempoToMs } from "./utils";

type Props = {
  bassScale: number[];
  bassTracks: number[][];
  scale: number[];
  tracks: number[][];
  bpm?: number;
  tone?: string;
  withKick?: boolean;
  mute?: boolean;
  onPatternPos?: (tick: number) => void;
};

export const useSynth = ({
  bassScale,
  bassTracks,
  scale,
  tracks,
  bpm = 120,
  tone = "ding",
  withKick = true,
  mute = false,
  onPatternPos,
}: Props) => {
  const handleSnapshot = useCallback(
    (e: { source: string; data: number }) => {
      if (e.source === "patternPos") {
        onPatternPos?.(Math.floor(tracks[0].length * e.data));
      }
    },
    [onPatternPos, tracks],
  );

  useEffect(() => {
    core.on("snapshot", handleSnapshot);
    return () => core.off("snapshot", handleSnapshot);
  }, [handleSnapshot]);

  const doRender = useCallback(() => {
    try {
      let tick = el.metro({ name: "tick", interval: tempoToMs(bpm, 16) });
      let beat = el.seq({ seq: [1, 1, 0, 0], hold: true }, tick);
      let sync = el.seq({ seq: [1, ...Array(15).fill(0)], hold: true }, tick);

      let signal = el.const({ value: 0 });
      let patternTrain = el.phasor(bpmToHz(bpm, 1));

      let patternCycle = el.seq(
        { seq: [...Array(16).fill(1)], hold: false, loop: true },
        tick,
      );
      let patternSignal = el.snapshot(
        { name: "patternPos" },
        patternCycle,
        patternTrain,
      );

      signal = el.add(signal, el.mul(0, patternSignal));

      signal = el.add(
        signal,
        synth({ tracks, tone, scale, tick, sync, gain: 0.7 }),
      );

      let [left, right] = [signal, signal]; // make stereo

      [left, right] = pingDelay(left, right, bpm);

      [left, right] = [left, right].map((c) =>
        el.mul(el.const({ key: "shaper", value: 0.47 }), c),
      );

      [left, right] = [
        el.add(left, el.meter({ name: "synth:left" }, left)),
        el.add(right, el.meter({ name: "synth:right" }, right)),
      ];

      // bass
      let bassNodes = bassSynth({
        tracks: bassTracks,
        scale: bassScale,
        tick,
        sync,
      });
      [left, right] = [
        el.add(left, el.meter({ name: "bass" }, bassNodes)),
        el.add(right, bassNodes),
      ];

      // kick
      let kickNodes = el.mul(
        el.const({ key: "withKick", value: withKick ? 1.0 : 0 }),
        drums(beat),
      );
      [left, right] = [
        el.add(left, el.meter({ name: "kick" }, kickNodes)),
        el.add(right, kickNodes),
      ];

      [left, right] = master(0.85 * (mute ? 0.0001 : 1), left, right);

      left = el.add(
        left,
        el.mul(el.const({ value: 0 }), el.add(tick, sync, beat)),
      );

      [left, right] = [
        el.meter({ name: "master:left" }, left),
        el.meter({ name: "master:right" }, right),
      ];

      const stats = core.render(left, right);
      console.log(stats);
    } catch (e) {
      console.log(e);
    }
  }, [bpm, tracks, tone, scale, bassTracks, bassScale, withKick, mute]);

  useEffect(() => {
    if (core.__renderer) {
      doRender();
    }
  }, [tracks, tone, scale, bpm, withKick, doRender]);
};
