import {
  el,
  ElementaryWebAudioRenderer as core,
} from "@elemaudio/core";
import { useCallback, useEffect } from "react";

import { bassSynth, drums, master, pingDelay, synth } from "./modules";
import { tempoToMs } from "./utils";

type Props = {
  bassScale: number[];
  bassTracks: number[][];
  scale: number[];
  tracks: number[][];
  bpm?: number;
  tone?: string;
  withKick?: boolean;
  mute?: boolean;
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
}: Props) => {
  const doRender = useCallback(() => {
    try {
      let signal = el.const({ value: 0 });

      let tick = el.metro({ name: "tick", interval: tempoToMs(bpm, 16) });
      let beat = el.seq({ seq: [1, 1, 0, 0], hold: true }, tick);
      let sync = el.seq({ seq: [1, ...Array(15).fill(0)], hold: true }, tick);

      signal = synth({ tracks, tone, scale, tick, sync });

      let [left, right] = [signal, signal]; // make stereo

      [left, right] = pingDelay(left, right, bpm);

      [left, right] = [left, right].map((c) =>
        el.mul(el.const({ key: "shaper", value: 0.37 }), c),
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
        el.const({ key: "withKick", value: withKick ? 1 : 0 }),
        drums(beat),
      );
      [left, right] = [
        el.add(left, el.meter({ name: "kick" }, kickNodes)),
        el.add(right, kickNodes),
      ];

      [left, right] = master(0.55 * (mute ? 0 : 1), left, right);

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
