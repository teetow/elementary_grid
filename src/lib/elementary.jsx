import {
  el,
  ElementaryWebAudioRenderer as core,
} from "@nick-thompson/elementary";
import { useCallback, useEffect, useRef, useState } from "react";

import { tempoToMs, range } from "./utils";

let ctx;

function getAudioCtx() {
  if (ctx) return ctx;
  console.log("creating a new AudioContext");
  return (ctx = new AudioContext());
}
getAudioCtx();

function tone(t, gain = 1.0) {
  return el.mul(
    gain,
    el.add(el.sin(el.mul(2 * Math.PI, t)), el.sin(el.mul(3 * Math.PI, t, 0.05)))
  );
}

/**
 *
 * @param {number[][]} tracks
 * @param {number[]} scale
 * @param {number} bpm
 * @param {function} onTick
 */

export const useElementary = (tracks, scale, bpm = 120, onTick) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const tick = useRef(el.metro({ name: "tick", interval: tempoToMs(bpm, 16) }));
  const sync = useRef(el.metro({ name: "sync", interval: tempoToMs(bpm, 1) }));

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
        const detune = 0.005;

        const seq = (i) =>
          el.seq({ seq: tracks[i], loop: false }, tick.current, sync.current);
        const env = (i) => el.adsr(0.01, 0.3, 0.1, 1.0, seq(i));
        const syn = (i) =>
          el.add(
            el.mul(tone(el.phasor(scale[i] * (1 + detune)), 0.5)),
            el.mul(tone(el.phasor(scale[i] * (1 - detune)), 0.5))
          );
        const trk = (i) => el.mul(env(i), syn(i));

        let out = el.add(
          el.add(range(4, 0).map(trk)),
          el.add(range(4, 4).map(trk)),
          el.add(range(4, 8).map(trk)),
          el.add(range(4, 12).map(trk))
        );

        let dly = el.delay(
          { size: 44100 },
          el.ms2samps(3 * tempoToMs(bpm, 16)),
          -0.3,
          out
        );
        out = el.add(el.mul(0.5, out), el.mul(0.15, dly));

        core.render(out, out, el.mul(0, tick.current), el.mul(0, sync.current));
      } catch (e) {
        console.log(e);
      }
    }
  }, [bpm, isLoaded, tracks, scale]);

  useEffect(() => {
    doRender();
  }, [doRender, tracks]);
};
