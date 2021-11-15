import { useState } from "react";
import { getTestSequence } from "./lib/notes";
import Grid from "./ui/Grid";
import Synth from "./ui/Synth";

import "./App.scss";

const scale = [
  "c3",
  "d3",
  "f3",
  "g3",
  "a3",
  "c4",
  "d4",
  "f4",
  "g4",
  "a4",
];

const bitsToNotes = (bits: number) => {
  let notes = [];
  let ctr = 0;

  while (bits > 0 && ctr <= 32) {
    if ((bits & 1) === 1) {
      notes.push(ctr);
    }
    bits = bits >> 1;
    ctr += 1;
  }

  return notes;
};

const makeNotes = (notes: number[]) => {
  return notes.map((noteBits) => bitsToNotes(noteBits).map((n) => scale[n]));
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
      <Synth sequence={makeNotes(notes)} />
      <Grid
        notes={notes}
        onToggleNote={toggleNote}
        onClear={() => setNotes(getTestSequence(16))}
      />
    </>
  );
}

export default App;
