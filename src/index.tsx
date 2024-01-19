import React from "react";

import { createRoot } from "react-dom/client";
import App from "./App";
import { BpmContextProvider } from "./lib/PlaybackContext";
import { core, initRenderer } from "./lib/webRenderer";
import Debugger from "./ui/Debugger";
import { Splash } from "./ui/Splash";

let ctx = new AudioContext();
initRenderer(ctx);

const root = createRoot(document.getElementById("app")!);

const runDebugger = false;

const RenderApp = () => {
  root.render(
    <React.StrictMode>
      {runDebugger ? (
        <Debugger />
      ) : (
        <BpmContextProvider>
          <App />
        </BpmContextProvider>
      )}
    </React.StrictMode>,
  );
};

core.on("load", async () => {
  if (ctx.state !== "running") {
    root.render(
      <Splash onClick={() => ctx.resume().then(() => RenderApp())} />,
    );
  } else {
    RenderApp();
  }
});
