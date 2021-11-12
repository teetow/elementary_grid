import { useState } from "react";
import { getTestSequence } from "./lib/notes";
import Grid from "./ui/Grid";
import Synth from "./ui/Synth";

import "./App.scss";

const scale = ["--", "c3", "d3", "f3", "g3", "a3", "c4", "d4", "f4", "g4", "a4"];

const highestNote = (n: number) => {
  let c = 0;
  while (n > 0) {
    n = n >> 1;
    c += 1;
  }
  return c;
};

const makeNotes = (notes: number[]) => {
  return notes.map((n) => scale[highestNote(n)]);
};

function App() {
  const [notes, setNotes] = useState(getTestSequence(16));

  const toggleNote = (step: number, note: number) => {
    const theNotes = [...notes];
    theNotes[step] = notes[step] ^ (1 << note);
    setNotes(theNotes);
  };

  return (
    <>
      <Synth notes={makeNotes(notes)} />
      <Grid
        notes={notes}
        onToggleNote={toggleNote}
        onClear={() => setNotes(getTestSequence(16))}
      />
    </>
  );
}

export default App;
