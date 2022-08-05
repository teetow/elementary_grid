import React from "react";
import { createRoot } from "react-dom/client";
import getCore from "./lib/withWebAudio";

import App from "./App";
import Debugger from "./ui/Debugger";
import { Splash } from "./ui/Splash";

const root = createRoot(document.getElementById("root")!);
const runDebugger = false;

const RenderApp = () => {
  root.render(
    <React.StrictMode>{runDebugger ? <Debugger /> : <App />}</React.StrictMode>,
  );
};

let ctx = new AudioContext();
let core = getCore();

core.on("load", () => {
  if (ctx.state !== "running") {
    root.render(
      <Splash onClick={() => ctx.resume().then(() => RenderApp())} />,
    );
  } else {
    RenderApp();
  }
});

async function main() {
  let node = await core.initialize(ctx, {
    numberOfInputs: 0,
    numberOfOutputs: 1,
    outputChannelCount: [2],
  });
  node.connect(ctx.destination);
}

main();
