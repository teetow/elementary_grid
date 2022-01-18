import {
  ElementaryWebAudioRenderer as core,
  MeterEvent,
} from "@elemaudio/core";
import Icons from "assets/icons";
import classNames from "classnames";
import useClickAway from "lib/useClickAway";
import { clamp } from "lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { encodeUrlParams, Patch } from "../lib/patch";
import { Logo } from "./Logo";
import "./Panel.scss";

const cls = "eg-panel";

const ShareWidget = ({ patch }: { patch: Patch }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showCopyAlert, setShowCopyAlert] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, (e) => {
    setShowMenu(false);
    setShowCopyAlert(false);
  });

  const makeUrl = useCallback(
    () => "https://teetow.github.io/elementary_grid/" + encodeUrlParams(patch),
    [patch],
  );

  const showPop = () => setShowCopyAlert(true);
  const hidePop = () => setShowCopyAlert(false);

  useEffect(() => {
    if (!showCopyAlert) {
      return;
    }
    const t = window.setTimeout(hidePop, 800);
    return () => window.clearTimeout(t);
  }, [showCopyAlert]);

  const handleCopyClick = useCallback(() => {
    navigator.clipboard.writeText(makeUrl());
    showPop();
  }, [makeUrl]);

  return (
    <div ref={ref} className="eg-share">
      <Icons.Share
        className="eg-share__icon"
        onClick={() => setShowMenu((prev) => !prev)}
      />
      {showMenu && (
        <ul className="eg-menu eg-share__menu">
          <li className="eg-menuitem">
            <a className="eg-text eg-text--link" href={makeUrl()}>
              Link to this track
            </a>
            <Icons.Copy
              className="eg-share__clipboardicon"
              onClick={handleCopyClick}
            />
            {showCopyAlert && (
              <div className="eg-share__copyalert">Copied!</div>
            )}
          </li>
          <li className="eg-meniutem">
            <a
              className="eg-text eg-text--menuitem twitter-share-button"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `I just made this with Elementary Grid!\n${makeUrl()}`,
              )}`}
              data-size="large"
            >
              Tweet track
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

const Switch = ({
  label,
  active,
  setActive,
}: {
  label: string;
  active: boolean;
  setActive: (active: boolean) => void;
}) => {
  return (
    <div className={`${cls}__option ${cls}__kick-switch`}>
      <input
        className={`${cls}__switch`}
        type="checkbox"
        id={`${label}`}
        checked={active}
        onChange={() => setActive(!active)}
      />
      <label htmlFor={`${label}`}>{label}</label>
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
    <div className={`${cls}__tone-picker`}>
      {tones.map((tone) => {
        return (
          <div className={`${cls}__option`} key={tone.name}>
            <input
              type="radio"
              className={`${cls}__led`}
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
  onSetMute: (mute: boolean) => void;
};

function Panel({ patch, onClear, onSetKick, onSetTone, onSetMute }: Props) {
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
    <div className={`${cls}`}>
      {fancyLayout && <Logo />}
      <button
        type="button"
        className={`eg-button ${cls}__clearbutton`}
        onClick={onClear}
      >
        Clear
      </button>
      <TonePicker currentTone={patch.tone as ToneName} onSetTone={onSetTone} />
      <Switch label="Kick" active={patch.useKick} setActive={onSetKick} />
      <Switch label="Mute" active={patch.mute || false} setActive={onSetMute} />
      <ShareWidget patch={patch} />
      {fancyLayout && (
        <div className={`${cls}__meters`}>
          <Meter id="synth" values={meters.synth} color="yellow" />
          <Meter id="bass" values={meters.bass} color="blue" />
          <Meter id="kick" values={meters.kick} color="orange" />
          <Meter id="master" values={meters.master} color="green" />
        </div>
      )}
    </div>
  );
}

export default Panel;
