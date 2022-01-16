import {
  ElementaryWebAudioRenderer as core,
  MeterEvent,
} from "@nick-thompson/elementary";
import classNames from "classnames";
import { clamp } from "lib/utils";
import { useCallback, useState } from "react";

import { Patch } from "../lib/patch";
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

type MeterProps = {
  id: string;
  values: number[];
  color?: "yellow" | "blue" | "orange" | "green";
};

const Meter = ({ id, values, color = "yellow" }: MeterProps) => (
  <div
    className={classNames([
      "eg-meter__track",
      `eg-meter__track--color-${color}`,
    ])}
  >
    {values.map((val, i) => (
      <div
        key={`meter:${id}:${i}`}
        className="eg-meter__value"
        style={{ transform: `scale(1, ${clamp(Math.abs(val)) * 100}%)` }}
      ></div>
    ))}
  </div>
);

type Meters = {
  synth: [number, number];
  bass: [number];
  kick: [number];
  master: [number, number];
};

core.on("load", () => {
  core.on("meter", (e: MeterEvent) => {
    meterCallback(e);
  });
});

let meterCallback = (source: MeterEvent) => {};

type Props = {
  patch: Patch;
  onClear: () => void;
  onSetKick: (useKick: boolean) => void;
  onSetTone: (tone: string) => void;
};

function Synth({ patch, onClear, onSetKick, onSetTone }: Props) {
  const [meters, setMeters] = useState<Meters>({
    synth: [0, 0],
    bass: [0],
    kick: [0],
    master: [0, 0],
  });

  const onMeter = useCallback(
    (e: MeterEvent) => {
      if (e.source === "synth:left") {
        setMeters((prev) => ({ ...prev, synth: [e.max, prev.synth[1]] }));
      }
      if (e.source === "synth:right") {
        setMeters((prev) => ({ ...prev, synth: [prev.synth[0], e.max] }));
      }
      if (e.source === "bass") {
        setMeters((prev) => ({ ...prev, bass: [e.max] }));
      }
      if (e.source === "kick") {
        setMeters((prev) => ({ ...prev, kick: [e.max] }));
      }
      if (e.source === "master:left") {
        setMeters((prev) => ({ ...prev, master: [e.max, prev.master[1]] }));
      }
      if (e.source === "master:right") {
        setMeters((prev) => ({ ...prev, master: [prev.master[0], e.max] }));
      }
    },
    [setMeters],
  );

  meterCallback = onMeter;

  const fancyLayout = window.matchMedia("(min-width: 35em)").matches;
  return (
    <div className="eg-synth">
      {fancyLayout && <Logo />}
      <button
        type="button"
        className="eg-button eg-synth__clearbutton"
        onClick={onClear}
      >
        Clear
      </button>
      <TonePicker currentTone={patch.tone as ToneName} onSetTone={onSetTone} />
      <KickSwitch active={patch.useKick} setActive={onSetKick} />
      {fancyLayout && (
        <div className="eg-synth__meters">
          <Meter id="synth" values={meters.synth} color="yellow" />
          <Meter id="bass" values={meters.bass} color="blue" />
          <Meter id="kick" values={meters.kick} color="orange" />
          <Meter id="master" values={meters.master} color="green" />
        </div>
      )}
    </div>
  );
}

export default Synth;
