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
  console.log("load");
  if (ctx.state !== "running") {
    console.log("showing splash");
    ReactDOM.render(
      <Splash onClick={() => ctx.resume().then(() => RenderApp())} />,
      document.getElementById("root")
    );
  } else {
    RenderApp();
  }
});

async function main() {
  console.log("main");
  let node = await core.initialize(ctx, {
    numberOfInputs: 0,
    numberOfOutputs: 1,
    outputChannelCount: [2],
  });
  console.log("initialized");
  node.connect(ctx.destination);
}

main();
