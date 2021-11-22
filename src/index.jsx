import { ElementaryWebAudioRenderer as core } from "@nick-thompson/elementary";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { Splash } from "./ui/Splash";

let ctx = new AudioContext();

const RenderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
};

core.on("load", () => {
  if (ctx.state !== "running") {
    ReactDOM.render(
      <Splash onClick={() => ctx.resume().then(() => RenderApp())} />,
      document.getElementById("root")
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
