import {
  el,
  ElementaryWebAudioRenderer as core,
} from "@nick-thompson/elementary";
import { useCallback, useEffect, useRef } from "react";

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
  const tick = useRef(el.metro({ name: "tick", interval: tempoToMs(bpm, 16) }));
  const beat = useRef(el.metro({ name: "beat", interval: tempoToMs(bpm, 4) }));
  const sync = useRef(el.metro({ name: "sync", interval: tempoToMs(bpm, 1) }));

  const doRender = useCallback(() => {
    try {
      core.render(
        el.mul(
          el.const({ value: 0 }),
          el.add(tick.current, sync.current, beat.current),
        ),
      );

      let signal = synth({ tracks, tone, scale, tick, sync });

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

      let bassNodes = bassSynth({
        tracks: bassTracks,
        scale: bassScale,
        tick,
        sync,
      });

      [left, right] = [left, right].map((c) =>
        el.add(c, el.mul(el.const({ value: 0.8 }), bassNodes), 0),
      );

      [left, right] = [left, right].map((c) =>
        el.add(
          c,
          el.mul(
            el.const({ key: "withKick", value: withKick ? 1 : 0 }),
            drums(beat),
          ),
        ),
      );
      [left, right] = master(0.7, left, right);

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
