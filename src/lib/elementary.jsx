import {
  el,
  ElementaryWebAudioRenderer as core,
} from "@nick-thompson/elementary";
import { useCallback, useEffect, useRef, useState } from "react";

import { tempoToMs, range } from "./utils";

import { ding, kick, pluck } from "./tones";

let ctx;

function getAudioCtx() {
  if (ctx) return ctx;
  console.log("creating a new AudioContext");
  return (ctx = new AudioContext());
}
getAudioCtx();

/**
 * @typedef {Object} Props
 *
 * @property {number[][]} tracks
 * @property {number[]} scale
 * @property {function} onTick
 * @property {boolean} [addKick]
 * @property {number} [bpm] - optional
 * @property {string} [tone] - optional
 */

const tones = {
  pluck: pluck,
  ding: ding,
  kick: kick,
};

/**
 *
 * @param {Props} props
 */
export const useElementary = ({
  tracks,
  scale,
  onTick,
  addKick = true,
  bpm = 120,
  tone = "ding",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const tick = useRef(
    el.metro({ name: "tick", interval: tempoToMs(bpm, 16) })
  ).current;
  const beat = useRef(
    el.metro({ name: "beat", interval: tempoToMs(bpm, 4) })
  ).current;
  const sync = useRef(
    el.metro({ name: "sync", interval: tempoToMs(bpm, 1) })
  ).current;

  const metroStep = useRef(0);

  useEffect(() => {
    let node;
    const load = async () => {
      node = await core.initialize(ctx, {
        numberOfInputs: 0,
        numberOfOutputs: 1,
        outputChannelCount: [4],
      });
      node.connect(ctx.destination);
      setIsLoaded(true);
    };
    load();
  }, []);

  useEffect(() => {
    core.on("metro", (e) => {
      if (e.source === "sync") {
        metroStep.current = -1;
      }

      if (e.source === "tick") {
        metroStep.current = metroStep.current + 1;
        onTick(metroStep.current);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doRender = useCallback(async () => {
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    if (isLoaded && ctx.state === "running") {
      try {
        const seq = (i) => el.seq({ seq: tracks[i], loop: false }, tick, sync);
        const env = (i) => el.adsr(0.01, 0.3, 0.1, 1.0, seq(i));
        const osc = (freq) => tones[tone](freq, 2.0);
        const voice = (i) => osc(scale[i]);
        const patch = (i) => el.mul(env(i), voice(i));

        let out = el.add(
          el.add(range(4, 0).map(patch)),
          el.add(range(4, 4).map(patch)),
          el.add(range(4, 8).map(patch)),
          el.add(range(4, 12).map(patch))
        );

        let dly = el.delay(
          { size: 44100 },
          el.ms2samps(3 * tempoToMs(bpm, 16)),
          -0.3,
          out
        );

        out = el.add(el.mul(0.5, out), el.mul(0.15, dly));

        if (addKick) {
          const kicktrack = kick({ gate: beat, pop: 1.2 });
          out = el.add(out, kicktrack);
        }

        out = el.add(el.mul(0, tick), el.mul(0, beat), el.mul(0, sync), out);

        core.render(out, out);
      } catch (e) {
        console.log(e);
      }
    }
  }, [beat, sync, tick, bpm, isLoaded, tracks, scale, tone, addKick]);

  useEffect(() => {
    doRender();
  }, [doRender, tracks]);
};
