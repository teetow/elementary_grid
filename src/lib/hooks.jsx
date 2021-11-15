import {
  el,
  ElementaryWebAudioRenderer as core
} from "@nick-thompson/elementary";
import { useCallback, useEffect, useState } from "react";
import { beatLenFromTempo } from "./utils";

let ctx;

function getAudioCtx() {
  if (ctx) return ctx;
  console.log("creating a new AudioContext");
  return (ctx = new AudioContext());
}
getAudioCtx();

/**
 * @typedef {Object} Voice
 * @property {number} key
 * @property {number} gate
 * @property {number} freq
 */

/**
 *
 * @param {Voice} voice
 * @returns
 */
function synthVoice(voice) {
  let gate = el.const({ key: `${voice.key}:gate`, value: voice.gate });
  let env = el.adsr(0.00001, 0.3, 0.1, 2.0, gate);

  return el.mul(
    env,
    el.blepsaw(el.const({ key: `${voice.key}:freq`, value: voice.freq }))
  );
}

/**
 *
 * @param {number[][]} freqseq
 * @param {number} bpm
 */
export const useElementary = (freqseq, bpm = 120) => {
  const [step, setStep] = useState(0);
  const [voices, setVoices] = useState(null);

  const stepForward = () => {
    setStep((prev) => {
      const nextStep = (prev + 1) % 16;
      return nextStep;
    });
  };

  useEffect(() => {
    let node;
    const load = async () => {
      node = await core.initialize(ctx, {
        numberOfInputs: 0,
        numberOfOutputs: 1,
        outputChannelCount: [2],
      });
      node.connect(ctx.destination);
    };
    load();

    core.on("load", () => {});

    core.on("metro", () => {
      stepForward();
    });
  }, [bpm]);

  useEffect(() => {
    const newNotes = freqseq[step];
    if (newNotes) {
      const newVoices = newNotes.map((note, index) => ({
        key: index,
        gate: 1,
        freq: note,
      }));
      setVoices(newVoices);
    }
  }, [step, freqseq]);

  const doRender = useCallback(async () => {
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    if (ctx.state === "running") {
      const pulseLen = beatLenFromTempo(bpm, 16);
      try {
        if (voices?.length > 0) {
          window.setTimeout(() => {
            const newVoices = voices.map(synthVoice);
            const stack = el.add(
              newVoices,
              el.mul(0.0, el.metro({ interval: pulseLen }))
            );

            core.render(stack, stack);
          }, 1);
          window.setTimeout(() => {
            const newVoices = voices
              .map((v) => ({ ...v, gate: 0 }))
              .map(synthVoice);
            const stack = el.add(
              newVoices,
              el.mul(0.0, el.metro({ interval: pulseLen }))
            );
            core.render(stack, stack);
          }, pulseLen / 2);

          // core.render(el.add(newVoices), el.add(newVoices));
        }
      } catch (e) {
        console.log(e);
      }
    }
  }, [bpm, voices]);

  useEffect(() => {
    doRender();
  }, [doRender, voices]);
};
