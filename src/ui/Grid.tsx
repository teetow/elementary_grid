import classnames from "classnames";
import { CSSProperties } from "react";

import "./Grid.scss";

type KeyProps = {
  step: number;
  note: number;
  label?: string;
  state: boolean;
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
      {label}
    </div>
  );
};

type Props = {
  notes: number[];
  onToggleNote: (step: number, note: number) => void;
};

const range = (n: number, start: number = 0) => [
  ...Array.from(Array(n - start).keys()).map((k) => k + start),
];

const Grid = ({ notes, onToggleNote }: Props) => {
  return (
    <div className="gs-grid">
      {range(16).map((step) => {
        return range(16, 1).map((note) => {
          return (
            <Key
              note={note}
              step={step}
              onToggle={() => onToggleNote(step, note)}
              state={(notes[step] & note) === note}
              label={`s${step}n${note}`}
            />
          );
        });
      })}
    </div>
  );
};

export default Grid;
