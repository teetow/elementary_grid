import { useState } from "react";

import { getTestSequence } from "./lib/notes";
import Grid from "./ui/Grid";

import "./App.scss";

function App() {
  const [notes, setNotes] = useState(getTestSequence(16));

  const toggleNote = (step: number, note: number) => {
    const theNotes = [...notes];
    theNotes[step] = notes[step] ^ (1 << note);
    setNotes(theNotes);
  };

  return (
    <Grid
      notes={notes}
      onToggleNote={toggleNote}
      onClear={() => setNotes(getTestSequence(16))}
    />
  );
}

export default App;
