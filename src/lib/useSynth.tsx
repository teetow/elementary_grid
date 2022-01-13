import {
  el,
  ElementaryWebAudioRenderer as core,
} from "@nick-thompson/elementary";
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
};
export const useSynth = ({
  bassScale,
  bassTracks,
  scale,
  tracks,
  bpm = 120,
  tone = "ding",
  withKick = true,
}: Props) => {
  const doRender = useCallback(() => {
    try {
      let signal = el.const({ value: 0 });

      let tick = el.metro({ name: "tick", interval: tempoToMs(bpm, 16) });
      let beat = el.seq({ seq: [1, 0, 0, 0], hold: true }, tick);
      let sync = el.seq({ seq: [1, 0, 0, 0], hold: true }, beat);

      signal = synth({ tracks, tone, scale, tick, sync });

      let [left, right] = [signal, signal]; // make stereo

      [left, right] = pingDelay(left, right, bpm);

      // bypass the verb until bug is fixed
      // let [verbL, verbR] = srvb({ name: "swag" }, 0.2, 0.3, 1.0, left, right);
      // [left, right] = [
      //   el.select(0.7, left, el.select(0.9, verbL, verbR)),
      //   el.select(0.7, right, el.select(0.9, verbR, verbL)),
      // ];

      [left, right] = [left, right].map((c) =>
        el.tanh(el.mul(el.const({ key: "shaper", value: 0.5 }), c)),
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

      let [bassL, bassR] = [left, right].map(() =>
        el.mul(el.const({ value: 0.9 }), bassNodes),
      );
      bassL = el.meter({ name: "bass" }, bassL);

      [left, right] = [left, right].map((c, i) => el.add(c, [bassL, bassR][i]));

      // kick
      let kickNodes = el.mul(
        el.const({ key: "withKick", value: withKick ? 1 : 0 }),
        drums(beat),
      );
      left = el.add(left, el.meter({ name: "kick" }, kickNodes));

      [left, right] = [left, right].map((c) => el.add(c, kickNodes));

      [left, right] = master(0.3, left, right);

      left = el.add(
        left,
        el.mul(el.const({ value: 0 }), el.add(tick, sync, beat)),
      );

      core.render(left, right);
    } catch (e) {
      console.log(e);
    }
  }, [tracks, tone, scale, bpm, bassTracks, bassScale, withKick]);

  useEffect(() => {
    if (core.__renderer) {
      doRender();
    }
  }, [tracks, tone, scale, bpm, withKick, doRender]);
};
