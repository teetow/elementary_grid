import WebAudioRenderer from "@elemaudio/web-renderer";

export const core = new WebAudioRenderer();

export const initRenderer = async (ctx: AudioContext) => {
  let node = await core.initialize(ctx, {
    numberOfInputs: 0,
    numberOfOutputs: 1,
    outputChannelCount: [2],
  });

  node.connect(ctx.destination);
};
