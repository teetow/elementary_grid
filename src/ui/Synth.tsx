import { Patch } from "../lib/patch";
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
  patch: Patch;
  scale: number[];
  bassScale: number[];
  onClear: () => void;
  onSetKick: (useKick: boolean) => void;
  onSetTone: (tone: string) => void;
};

function Synth({
  patch,
  scale,
  bassScale,
  onClear,
  onSetKick,
  onSetTone,
}: Props) {
  useSynth({
    scale: scale,
    bassScale: bassScale,
    tone: patch.tone,
    tracks: patch.tracks,
    bassTracks: patch.bassTracks,
    withKick: patch.useKick,
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
      <TonePicker currentTone={patch.tone as ToneName} onSetTone={onSetTone} />
      <KickSwitch active={patch.useKick} setActive={onSetKick} />
    </div>
  );
}

export default Synth;
