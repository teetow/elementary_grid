import { el } from "@elemaudio/core";
import { useCallback, useContext, useEffect } from "react";
import { ElemNode } from "../types/elemaudio__core";
import PlaybackContext from "./PlaybackContext";
import { bassSynth, drums, master, pingDelay, synth } from "./modules";
import { bpmToHz } from "./utils";
import { core } from "./webRenderer";

type Props = {
  bassScale: number[];
  bassTracks: number[][];
  scale: number[];
  tracks: number[][];
  tone?: string;
  withKick?: boolean;
  mute?: boolean;
};

type EventCallbackParams = { source?: string; min: number; max: number };

let meterCallback = (e: EventCallbackParams) => {};

core.on("load", () => {
  core.on("meter", (e) => {
    meterCallback(e);
  });
});

export const useSynth = ({
  bassScale,
  bassTracks,
  scale,
  tracks,
  tone = "ding",
  withKick = true,
  mute = false,
}: Props) => {
  const playheadCtx = useContext(PlaybackContext);
  const bpm = playheadCtx.bpm;

  const handleSnapshot = useCallback(
    (e: { source?: string; data: number }) => {
      if (e.source === "patternPos") {
        playheadCtx.playheadPos = Math.round(tracks[0].length * e.data);
      }
    },
    [playheadCtx, tracks],
  );

  useEffect(() => {
    core.on("snapshot", handleSnapshot);
    return () => {
      core.off("snapshot", handleSnapshot);
    };
  }, [handleSnapshot]);

  meterCallback = (e) => {
    if (e.source) {
      playheadCtx.meters[e.source] = e.max;
    }
  };

  const doRender = useCallback(() => {
    try {
      let bpmAsHz = el.const({ key: "bpm:hz", value: bpmToHz(bpm, 1) });

      let subdiv = el.train(el.mul(bpmAsHz, 16));
      let sync = el.seq2(
        { seq: [1, ...Array(15).fill(0)], hold: false },
        subdiv,
        0,
      );
      let beat = el.seq2({ seq: [1, 1, 1, 0], hold: true }, subdiv, sync);

      let signal = el.const({ value: 0 }) as ElemNode;

      let playheadTrain = el.phasor(bpmAsHz, sync);
      let playheadSignal = el.snapshot(
        { name: "patternPos" },
        subdiv,
        playheadTrain,
      );

      signal = el.add(signal, el.mul(0, playheadSignal));

      signal = el.add(
        signal,
        synth({ tracks, tone, scale, tick: subdiv, sync, gain: 0.7 }),
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
        tick: subdiv,
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
        el.mul(el.const({ value: 0 }), el.add(subdiv, sync, beat)),
      );

      [left, right] = [
        el.meter({ name: "master:left" }, left),
        el.meter({ name: "master:right" }, right),
      ];

      const stats = core.render(left, right);
    } catch (e) {
      console.log(e);
    }
  }, [bpm, tracks, tone, scale, bassTracks, bassScale, withKick, mute]);

  useEffect(() => {
    if (core) {
      doRender();
    }
  }, [tracks, tone, scale, bpm, withKick, doRender]);
};
