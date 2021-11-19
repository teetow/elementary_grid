import { useElementary } from "../lib/elementary";
import { midiToFrequency } from "../lib/utils";

type Props = {
  scale: number[];
  sequence: number[][];
  onTick: (step: number) => void;
};

function Synth({ scale, sequence, onTick }: Props) {
  useElementary({
    tracks: sequence,
    scale: scale.map(midiToFrequency),
    onTick: onTick,
  });
  return <></>;
}

export default Synth;
