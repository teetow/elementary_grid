import { el } from "@elemaudio/core";
import { useCallback, useContext, useEffect } from "react";
import { ElemNode } from "../types/elemaudio__core";
import PlaybackContext, {
  SCOPE_BUF_SIZE,
  SCOPE_NUM_BUFS,
} from "./PlaybackContext";
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

export const useSynth = ({
  bassScale,
  bassTracks,
  scale,
  tracks,
  tone = "ding",
  withKick = true,
  mute = false,
}: Props) => {
  const pbCtx = useContext(PlaybackContext);
  const bpm = pbCtx.bpm;

  const handleScope = useCallback(
    (e: { source?: string; data: Float32Array[] }) => {
      if (!e.source) {
        return;
      }

      if (!pbCtx.scope[e.source]) {
        pbCtx.scope[e.source] = [];
      } else {
        if (pbCtx.scope[e.source].length >= SCOPE_NUM_BUFS) {
          pbCtx.scope[e.source] = [];
        }
      }

      pbCtx.scope[e.source].push(e.data[0]);
    },
    [],
  );

  useEffect(() => {
    core.on("scope", handleScope);
    return () => {
      core.off("scope", handleScope);
    };
  }, [handleScope]);

  const handleSnapshot = useCallback(
    (e: { source?: string; data: number }) => {
      if (e.source === "snapshot:patternpos") {
        pbCtx.playheadPos = tracks[0].length * e.data;
      } else if (e.source === "reset") {
        Object.keys(pbCtx.scope).forEach((key) => (pbCtx.scope[key] = []));
      }
    },
    [pbCtx, tracks],
  );

  useEffect(() => {
    core.on("snapshot", handleSnapshot);
    return () => {
      core.off("snapshot", handleSnapshot);
    };
  }, [handleSnapshot]);

  const handleMeter = (e: { source?: string; min: number; max: number }) => {
    if (e.source) {
      pbCtx.meters[e.source] = e.max;
    }
  };

  useEffect(() => {
    core.on("meter", handleMeter);
    return () => {
      core.off("meter", handleMeter);
    };
  }, [handleMeter]);

  const doRender = useCallback(() => {
    try {
      let bpmAsHz = el.const({
        key: "bpm:hz",
        value: bpmToHz(bpm, 1),
      }) as ElemNode;

      let tick = el.train(el.mul(bpmAsHz, 16));
      tick = el.scope({ name: "debug:tick", size: SCOPE_BUF_SIZE }, tick);

      let sync = el.seq2(
        { seq: [1, ...Array(15).fill(0)], hold: true },
        tick,
        0,
      );
      sync = el.scope({ name: "debug:sync", size: SCOPE_BUF_SIZE }, sync);
      sync = el.snapshot({ name: "reset" }, sync, sync);

      let beat = el.seq2({ seq: [1, 0, 0, 0], hold: true }, tick, sync);
      beat = el.scope({ name: "debug:beat", size: SCOPE_BUF_SIZE }, beat);

      let signal = el.const({ value: 0 }) as ElemNode;

      let playheadTrain = el.syncphasor(bpmAsHz, sync);
      playheadTrain = el.scope(
        { name: "debug:playhead", size: SCOPE_BUF_SIZE },
        playheadTrain,
      );

      let playheadSignal = el.snapshot(
        { name: "snapshot:patternpos" },
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

      [left, right] = [
        el.scope({ name: "master:left", size: SCOPE_BUF_SIZE }, left),
        el.scope({ name: "master:right", size: SCOPE_BUF_SIZE }, right),
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
