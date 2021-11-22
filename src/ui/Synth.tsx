/* eslint-disable no-useless-rename */
import { useState } from "react";
import { useSynth } from "../lib/useSynth";
import { Logo } from "./Logo";

import "./Synth.scss";



const KickSwitch = ({
  active,
  setActive,
}: {
  active: boolean;
  setActive: (active: boolean) => void;
}) => {
  return (
    <div className="eg-synth__option eg-synth__kick-switch">
      <input
        className="eg-synth__switch"
        type="checkbox"
        id="kick"
        checked={active}
        onChange={() => setActive(!active)}
      />
      <label htmlFor="kick">Kick</label>
    </div>
  );
};

type ToneName = "stab" | "ding";
type Tone = {
  name: ToneName;
  label: string;
};
const tones = [
  { name: "stab", label: "Stab" },
  { name: "ding", label: "Ding" },
] as Array<Tone>;

type TonePickerProps = {
  currentTone: ToneName;
  onSetTone: (name: ToneName) => void;
};

const TonePicker = ({ currentTone, onSetTone }: TonePickerProps) => {
  return (
    <div className="eg-synth__tone-picker">
      {tones.map((tone) => {
        return (
          <div className="eg-synth__option" key={tone.name}>
            <input
              type="radio"
              className="eg-synth__led"
              id={tone.name}
              value={tone.name}
              checked={tone.name === currentTone}
              onChange={() => onSetTone(tone.name)}
            />
            <label htmlFor={tone.name}>{tone.label}</label>
          </div>
        );
      })}
    </div>
  );
};

type Props = {
  scale: number[];
  sequence: number[][];
  onClear: () => void;
};

function Synth({ scale, sequence, onClear }: Props) {
  const [currentTone, setCurrentTone] = useState<ToneName>("stab");
  const [withKick, setWithKick] = useState<boolean>(false);

  useSynth({
    tracks: sequence,
    scale: scale,
    tone: currentTone,
    withKick: withKick,
  });

  return (
    <div className="eg-synthoptions">
      <Logo />
      <button
        type="button"
        className="eg-button eg-synth__clearbutton"
        onClick={onClear}
      >
        Clear
      </button>
      <TonePicker currentTone={currentTone} onSetTone={setCurrentTone} />
      <KickSwitch active={withKick} setActive={setWithKick} />
    </div>
  );
}

export default Synth;
