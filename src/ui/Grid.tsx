import classnames from "classnames";
import { CSSProperties, HTMLAttributes, useEffect, useState } from "react";

import "./Grid.scss";

type StepNote = {
  step: number;
  note: number;
  state: boolean;
  key?: string;
  label?: string;
};

type KeyProps = StepNote &
  HTMLAttributes<HTMLDivElement> & {
    onToggle: (note: number) => void;
  };

const Key = ({ step, note, label, state, onToggle, ...rest }: KeyProps) => {
  const keyClasses = classnames({
    "gs-key": true,
    "gs-key--is-active": state,
  });

  const keyStyle = {
    "--step": step,
    "--note": note,
  } as CSSProperties;

  return (
    <div
      className={keyClasses}
      style={keyStyle}
      onClick={() => onToggle(note)}
      {...rest}
    >
      <div className="gs-key__label">{label}</div>
    </div>
  );
};

type Props = {
  notes: number[];
  onToggleNote: (step: number, note: number) => void;
  onClear: () => void;
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

type PaintMode = "none" | "fill" | "clear";

const Grid = ({ notes, onToggleNote, onClear }: Props) => {
  const [paintMode, setPaintMode] = useState<PaintMode>("none");

  const handleMouseUp = () => setPaintMode("none");

  const handleMouseDown = (step: number, note: number) => {
    const notePos = 1 << note;

    if ((notes[step] & notePos) === notePos) {
      setPaintMode("clear");
    } else {
      setPaintMode("fill");
    }

    onToggleNote(step, note);
  };

  const handlePaint = (step: number, note: number) => {
    const notePos = 1 << note;

    if (paintMode === "fill" && (notes[step] & notePos) !== notePos) {
      onToggleNote(step, note);
    }

    if (paintMode === "clear" && (notes[step] & notePos) === notePos)
      onToggleNote(step, note);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  return (
    <div className="gs-grid">
      <div className="gs-grid__field">
        {makeGridNotes(notes).map(
          ({ key, step, note, state, label }: StepNote) => (
            <Key
              key={key}
              note={note}
              step={step}
              state={state}
              label={label}
              onToggle={() => onToggleNote(step, note)}
              onMouseEnter={() =>
                paintMode !== "none" && handlePaint(step, note)
              }
              onMouseDown={() => handleMouseDown(step, note)}
            />
          )
        )}
      </div>
      <div className="gs-grid__toolbar">
        <button onClick={onClear}>Clear</button>
      </div>
    </div>
  );
};

export default Grid;
