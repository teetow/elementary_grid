import { getTestSequence } from "./lib/notes";
import Grid from "./ui/Grid";

import "./App.scss";
import { useState } from "react";

function App() {
  const [notes, setNotes ] = useState(getTestSequence(16));

  const toggleNote = (step: number, note: number) => {
    const theNotes = notes;
    theNotes[step] = notes[step] ^ note;
    setNotes(theNotes);
  }

  return <Grid notes={notes} onToggleNote={toggleNote} ></Grid>;
}

export default App;
