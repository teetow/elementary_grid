import WebAudioRenderer from "@elemaudio/web-renderer";
import { el, NodeRepr_t } from "@elemaudio/core";

// import {
//   el,
//   ElementaryWebAudioRenderer as core,
//   MeterEvent,
// } from "@elemaudio/core";
import { useCallback, useContext, useEffect } from "react";
import { bassSynth, drums, master, pingDelay, synth } from "./modules";
import PlaybackContext from "./PlaybackContext";
import { bpmToHz } from "./utils";
import { MeterEvent } from "@elemaudio/legacy";

type Props = {
  bassScale: number[];
  bassTracks: number[][];
  scale: number[];
  tracks: number[][];
  tone?: string;
  withKick?: boolean;
  mute?: boolean;
};

let core = new WebAudioRenderer();

let meterCallback = (e: any) => {};

core.on("load", () => {
  core.on("meter", (e: any) => {
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
    (e: { source: string; data: number }) => {
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

  meterCallback = (e: MeterEvent) => {
    if (e.source) {
      playheadCtx.meters[e.source] = e.max;
    }
  };

  const doRender = useCallback(() => {
    try {
      let bpmAsHz = el.const({ key: "bpm:hz", value: bpmToHz(bpm, 1) });

      let tick = el.train(el.mul(bpmAsHz, 16));
      let sync = el.seq(
        { seq: [1, ...Array(15).fill(0)], hold: false },
        tick,
        0,
      );
      let beat = el.seq({ seq: [1, 1, 1, 0], hold: true }, tick, sync);

      let signal: number | NodeRepr_t = el.const({ value: 0 });

      let playheadTrain = el.phasor(bpmAsHz, sync);
      let playheadSignal = el.snapshot(
        { name: "patternPos" },
        tick,
        playheadTrain,
      );

      signal = el.add(signal, el.mul(0, playheadSignal));

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

      core.render(left, right);
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
