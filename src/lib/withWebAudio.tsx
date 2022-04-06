import WebAudioRenderer from "@elemaudio/web-renderer";

let core: WebAudioRenderer;

const getCore = () => {
  if (!core) {
    core = new WebAudioRenderer();
  }

  return core;
};

export default getCore;
