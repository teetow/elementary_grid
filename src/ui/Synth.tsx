import React, { useEffect, useState } from "react";
import { midiToFrequency, noteToMidi, useElementary } from "../lib/hooks";

type Props = {
  notes: string[];
};

function Synth({ notes }: Props) {
  const [freqs, setFreqs] = useState<number[]>();

  useEffect(() => {
    const midiNotes = notes.map(noteToMidi);
    setFreqs(midiNotes.map(midiToFrequency));
  }, [notes]);

  useElementary(freqs);

  return <h1>Elementary is alive!</h1>;
}

export default Synth;
