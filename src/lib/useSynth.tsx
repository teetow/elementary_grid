import { el, core } from "./elementary";
import { useCallback, useEffect, useRef } from "react";

import { bassSynth, drums, fx, master, synth } from "./modules";
import { tempoToMs } from "./utils";

type Props = {
  tracks: number[][];
  bassTracks: number[][];
  scale: number[];
  bassScale: number[];
  withKick: boolean;
  bpm: number;
  tone: string;
};
export const useSynth = ({
  tracks,
  bassTracks,
  scale,
  bassScale,
  withKick = true,
  bpm = 120,
  tone = "ding",
}: Props) => {
  const tick = useRef(el.metro({ name: "tick", interval: tempoToMs(bpm, 16) }));
  const beat = useRef(el.metro({ name: "beat", interval: tempoToMs(bpm, 4) }));
  const sync = useRef(el.metro({ name: "sync", interval: tempoToMs(bpm, 1) }));

  const doRender = useCallback(() => {
    try {
      let nodes = synth({ tracks, tone, scale, tick, sync });

      nodes = fx(nodes, bpm);
      nodes = el.tanh(el.mul(0.4, nodes));

      let bassNodes = bassSynth({
        tracks: bassTracks,
        scale: bassScale,
        tick,
        sync,
      });

      nodes = el.add(nodes, el.mul(0.8, bassNodes), 0);

      nodes = el.add(nodes, el.mul(withKick ? 1 : 0, drums(beat)));

      nodes = master(nodes, tick, beat, sync, 0.6);

      core.render(nodes, nodes);
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
