import { useEffect, useState } from "react";
import { useElementary } from "../lib/hooks";
import { midiToFrequency, noteToMidi } from "../lib/utils";

type Props = {
  sequence: string[][];
};

function Synth({ sequence }: Props) {
  const [freqs, setFreqs] = useState<number[][]>();

  useEffect(() => {
    const midiNotes = sequence.map((step) =>
      step.map((n) => midiToFrequency(noteToMidi(n)) * 4)
    );
    setFreqs(midiNotes);
  }, [sequence]);

  useElementary(freqs || []);

  return <h1>Elementary is alive!</h1>;
}

export default Synth;
