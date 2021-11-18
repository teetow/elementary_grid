import { useState } from "react";
import { noteToMidi, range } from "./lib/utils";

import Grid from "./ui/Grid";
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
  const [metroStep, setMetroStep] = useState<number>(0);

  const toggleNote = (note: number, step: number, value: number) => {
    const newTracks = [...tracks];
    newTracks[note][step] = value;
    setTracks(newTracks);
  };

  const onMetro = (step: number) => {
    setMetroStep(step);
  };

  return (
    <>
      <Synth
        scale={scale.map(noteToMidi)}
        sequence={tracks}
        onMetro={onMetro}
      />
      <Grid
        keyrange={16}
        notes={tracks}
        onToggleNote={toggleNote}
        hilightStep={metroStep}
        onClear={() => setTracks(initTracks())}
      />
    </>
  );
}

export default App;
