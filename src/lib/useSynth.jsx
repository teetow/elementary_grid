import {
  el,
  ElementaryWebAudioRenderer as core,
} from "@nick-thompson/elementary";
import { useCallback, useEffect, useRef } from "react";

import { drums, fx, master, synth } from "./modules";
import { tempoToMs } from "./utils";

/**
 * @typedef {Object} Props
 *
 * @property {number[][]} tracks
 * @property {number[]} scale
 * @property {boolean} [withKick]
 * @property {number} [bpm]
 * @property {string} [tone]
 */

/**
 * @param {Props} props
 */
export const useSynth = ({
  tracks,
  scale,
  withKick = true,
  bpm = 120,
  tone = "ding",
}) => {
  const tick = useRef(el.metro({ name: "tick", interval: tempoToMs(bpm, 16) }));
  const beat = useRef(el.metro({ name: "beat", interval: tempoToMs(bpm, 4) }));
  const sync = useRef(el.metro({ name: "sync", interval: tempoToMs(bpm, 1) }));

  const doRender = useCallback(() => {
    try {
      let nodes = synth({ tracks, tone, scale, tick, sync });

      nodes = fx(nodes, bpm, 1.0);

      nodes = el.tanh(el.mul(0.4, nodes));

      if (withKick) {
        nodes = el.add(nodes, drums(beat));
      }

      nodes = master(nodes, tick, beat, sync);

      core.render(nodes, nodes);
    } catch (e) {
      console.log(e);
    }
  }, [tracks, tone, scale, bpm, withKick]);

  useEffect(() => {
    if (core.__renderer) {
      doRender();
    }
  }, [tracks, tone, scale, bpm, withKick, doRender]);
};
