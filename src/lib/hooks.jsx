import {
  el,
  ElementaryWebAudioRenderer as core,
} from "@nick-thompson/elementary";
import { useCallback, useEffect, useState } from "react";

let ctx;
function getAudioCtx() {
  if (ctx) return ctx;
  console.log("creating a new AudioContext");
  return (ctx = new AudioContext());
}
getAudioCtx();

/**
 * Calculate the length, in ms, of one given subdivision at the specificed BPM
 * @param {*} tempo tempo in Beats Per Minute
 * @param {*} div subdivision for which the length is sought, defaults to 16:th note
 * @returns the length of one subdivision in ms
 */
const beatLenFromTempo = (tempo, div = 16) => {
  const beatLen = 1 / (tempo / 60);
  return ((beatLen * 4) / div) * 1000;
};

export function noteToMidi(n) {
  let notes = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
  let [name, octave] = n.split("");

  if (notes.indexOf(name) < 0) return -1;

  return 12 * octave + notes.indexOf(name);
}

export function midiToFrequency(m) {
  if (m < 0) {
    return 0;
  }
  return 440 * Math.pow(2, (m - 69) / 12);
}

const generateSeq = (notes) => {
  let train = el.train(10.0);
  // let train = el.metro(bpm);
  let env = el.adsr(0.01, 0.25, 0.0, 0.1, train);

  let modulate = (x, rate, amount) => el.add(x, el.mul(amount, el.cycle(rate)));

  let synth = el.mul(
    0.2,
    env,
    el.lowpass(
      modulate(900, 0.1, 300),
      1.0,
      el.add(
        el.blepsaw(el.mul(0.99, el.seq({ seq: notes, hold: true }, train))),
        el.blepsaw(el.mul(1.01, el.seq({ seq: notes, hold: true }, train)))
      )
    )
  );
  return synth;
};

function synthVoice(voice) {
  let gate = el.const({ key: `${voice.key}:gate`, value: 0.2 * voice.gate });
  let env = el.adsr(4.0, 1.0, 0.4, 2.0, gate);

  return el.mul(
    env,
    el.blepsaw(el.const({ key: `${voice.key}:freq`, value: voice.freq }))
  );
}

export const useElementary = (notes, bpm = 120) => {
  const [seq, setSeq] = useState(generateSeq(notes));
  const [step, setStep] = useState(0);

  const stepForward = () => {
    setStep((prev) => {
      console.log("step was", prev);
      return prev + 1;
    });
    // setStep(step + 1);
  };

  useEffect(() => {
    console.log(step);
  }, [step]);

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

    core.on("metro", () => {
      console.log("tick");
      stepForward();
    });
  }, []);

  useEffect(() => {
    setSeq(generateSeq(notes));
  }, [notes]);

  const doRender = useCallback(async () => {
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    if (seq && ctx.state === "running") {
      try {
        core.render(synthVoice(0), seq);
        // core.render(seq, seq);
      } catch (e) {
        console.log(e);
      }
    }
  }, [seq]);

  useEffect(() => {
    doRender();
  }, [doRender, seq]);
};
