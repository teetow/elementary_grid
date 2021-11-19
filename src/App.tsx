import { useState } from "react";

import { noteToMidi, range } from "./lib/utils";

import Grid from "./ui/Grid";
import Splainer from "./ui/Splainer";
import Synth from "./ui/Synth";

import "./App.scss";

const pentaScale = ["c", "d", "f", "g", "a"];

const numTracks = 16;
const numSteps = 16;

const scale = range(numTracks)
  .map(
    (i) =>
      `${pentaScale[i % pentaScale.length]}${
        Math.floor(i / pentaScale.length) + 4
      }`
  )
  .flat();

const initTracks = () =>
  Array.from(Array(numTracks), () => new Array(numSteps).fill(0));

function App() {
  const [tracks, setTracks] = useState<number[][]>(initTracks());
  const [tick, setTick] = useState<number>(0);

  const toggleNote = (note: number, step: number, value: number) => {
    setTracks((prevTracks) => {
      const newTracks = [...prevTracks];
      newTracks[note][step] = value;

      return newTracks;
    });
  };

  const onTick = (tick: number) => {
    setTick(tick);
  };

  return (
    <div className="eg-app">
      <Synth
        scale={scale.map(noteToMidi)}
        sequence={tracks}
        onTick={onTick}
      />
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
}

export default App;
