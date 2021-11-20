import { useCallback, useState } from "react";

import { getAudioCtx, initElementary } from "./lib/elementary";
import { makeScale } from "./lib/utils";
import Grid from "./ui/Grid";
import Splainer from "./ui/Splainer";
import Synth from "./ui/Synth";

import "./App.scss";

const numTracks = 16;
const numSteps = 16;

const scale = makeScale(["c", "d", "f", "g", "a"], numTracks);

getAudioCtx();

let metroCallback = (source: string) => {};

initElementary().then((core) => {
  core.on("metro", (e: { source: string }) => {
    metroCallback(e.source);
  });
});

const initTracks = () =>
  Array.from(Array(numTracks), () => new Array(numSteps).fill(0));

const App = () => {
  const [tracks, setTracks] = useState<number[][]>(initTracks());
  const [tick, setTick] = useState<number>(0);

  const toggleNote = (note: number, step: number, value: number) => {
    setTracks((prevTracks) => {
      const newTracks = [...prevTracks];
      newTracks[note][step] = value;

      return newTracks;
    });
  };

  const onTick = useCallback(
    (source: string) => {
      if (source === "sync") {
        setTick(0);
      } else if (source === "tick") {
        setTick((prev) => (prev + 1) % tracks.length);
      }
    },
    [tracks]
  );

  metroCallback = onTick;

  return (
    <div className="eg-app">
      <Synth scale={scale} sequence={tracks} />

      <Grid
        keyrange={16}
        notes={tracks}
        onToggleNote={toggleNote}
        hilightStep={tick}
        onClear={() => setTracks(initTracks())}
      />
      <Splainer />
    </div>
  );
};

export default App;
