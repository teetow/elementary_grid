import { ElementaryWebAudioRenderer as core } from "@nick-thompson/elementary";

let ctx;

export function getAudioCtx() {
  if (ctx) return ctx;
  return (ctx = new AudioContext());
}

let node;
export const initElementary = async (onMetro) => {
  getAudioCtx();

  node = await core.initialize(getAudioCtx(), {
    numberOfInputs: 0,
    numberOfOutputs: 1,
    outputChannelCount: [2],
  });
  node.connect(ctx.destination);

  return core;
};
