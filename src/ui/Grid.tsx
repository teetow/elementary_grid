import classnames from "classnames";
import { CSSProperties } from "react";

import "./Grid.scss";

type StepNote = {
  step: number;
  note: number;
  state: boolean;
  key?: string;
  label?: string;
};

type KeyProps = StepNote & {
  onToggle: (note: number) => void;
};

const Key = ({ step, note, label, state, onToggle }: KeyProps) => {
  const keyClasses = classnames({
    "gs-key": true,
    "gs-key--is-active": state,
  });

  const keyStyle = {
    "--step": step,
    "--note": note,
  } as CSSProperties;

  return (
    <div className={keyClasses} style={keyStyle} onClick={() => onToggle(note)}>
      <div className="gs-key__label">{label}</div>
    </div>
  );
};

type Props = {
  notes: number[];
  onToggleNote: (step: number, note: number) => void;
};

const range = (n: number, start: number = 0) => [
  ...Array.from(Array(n).keys()).map((k) => k + start),
];

const makeGridNotes = (notes: number[]) => {
  const newNotes: StepNote[] = [];

  range(16).forEach((step) => {
    range(7).forEach((note) => {
      const notePos = 1 << note;
      const state = (notes[step] & notePos) === notePos;

      newNotes.push({
        key: `${step}${note}${state ? "on" : "off"}`,
        note: note,
        step: step,
        state: state,
        label: `s${step.toString().padStart(2, "0")}n${note
          .toString()
          .padStart(2, "0")}`,
      });
    });
  });
  return newNotes;
};

const Grid = ({ notes, onToggleNote }: Props) => {
  return (
    <div className="gs-grid">
      {makeGridNotes(notes).map(
        ({ key, step, note, state, label }: StepNote) => (
          <Key
            key={key}
            note={note}
            step={step}
            onToggle={() => onToggleNote(step, note)}
            state={state}
            label={label}
          />
        )
      )}
    </div>
  );
};

export default Grid;
