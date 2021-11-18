import { useElementary } from "../lib/elementary";
import { midiToFrequency } from "../lib/utils";

type Props = {
  scale: number[];
  sequence: number[][];
  onMetro: (step: number) => void;
};

function Synth({ scale, sequence, onMetro }: Props) {

  useElementary(sequence, scale.map(midiToFrequency), 120, onMetro);

  return <h1>Elementary is alive!</h1>;
}

export default Synth;
