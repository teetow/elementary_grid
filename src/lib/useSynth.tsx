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
      let signal = synth({ tracks, tone, scale, tick, sync });

      let [left, right] = [signal, signal]; // make stereo

      [left, right] = pingDelay(left, right, bpm);

      // let [verbL, verbR] = verb(left, right, 0.001);
      // const mixVerb = (dry: Node, wet: Node, otherWet: Node, width = 0.7) =>
      //   el.add(dry, el.mul(1, wet), el.mul(1 - width, otherWet));
      // left = mixVerb(left, verbL, verbR);
      // right = mixVerb(right, verbR, verbL);

      [left, right] = [left, right].map((c) => el.tanh(el.mul(0.4, c)));

      let bassNodes = bassSynth({
        tracks: bassTracks,
        scale: bassScale,
        tick,
        sync,
      });

      [left, right] = [left, right].map((c) =>
        el.add(c, el.mul(0.8, bassNodes), 0),
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

      [left, right] = master(tick, beat, sync, 0.6, left, right);

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
