import classnames from "classnames";
import { CSSProperties, HTMLAttributes, useEffect, useState } from "react";
import { range } from "../lib/utils";

import "./Grid.scss";

type StepNote = {
  hasHilight?: boolean;
  key?: string;
  label?: string;
  note: number;
  state: boolean;
  step: number;
};

type KeyProps = StepNote &
  HTMLAttributes<HTMLDivElement> & {
    onToggle: (note: number) => void;
  };

const Key = ({
  hasHilight,
  label,
  note,
  onToggle,
  state,
  step,
  ...rest
}: KeyProps) => {
  const keyClasses = classnames({
    "gs-key": true,
    "gs-key--is-active": state,
    "gs-key--has-hilight": hasHilight,
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

const makeGridNotes = (notes: number[][]) => {
  const newNotes: StepNote[] = [];

  range(notes.length).forEach((note) => {
    range(notes[0].length).forEach((step) => {
      const state = notes[note][step] === 1;
      const key = `${note}_${step}_${state ? "on" : "off"}`;
      newNotes.push({
        key: key,
        note: note,
        step: step,
        state: state,
        label: `s${step}n${note}`,
      });
    });
  });
  return newNotes;
};

type PaintMode = "none" | "fill" | "clear";

type Props = {
  notes: number[][];
  keyrange?: number;
  hilightStep?: number;
  onToggleNote: (note: number, step: number, mode: number) => void;
  onClear: () => void;
};

const Grid = ({ notes, hilightStep, onToggleNote, onClear }: Props) => {
  const [paintMode, setPaintMode] = useState<PaintMode>("none");

  const handleMouseUp = () => setPaintMode("none");

  const handleMouseDown = (note: number, step: number) => {
    if (notes[note][step] === 0) {
      onToggleNote(note, step, 1);
      setPaintMode("fill");
    } else {
      onToggleNote(note, step, 0);
      setPaintMode("clear");
    }
  };

  const handlePaint = (note: number, step: number) => {
    if (paintMode === "fill" && notes[note][step] === 0) {
      onToggleNote(note, step, 1);
    }

    if (paintMode === "clear" && notes[note][step] === 1)
      onToggleNote(note, step, 0);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const fieldStyle = {
    "--columns": notes[0].length,
    "--rows": notes.length,
  } as CSSProperties;

  const cursorStyle = {
    "--cursor": hilightStep,
  } as CSSProperties;

  return (
    <div className="gs-grid">
      <div className="gs-grid__field" style={fieldStyle}>
        {makeGridNotes(notes).map(
          ({ key, note, step, state, label }: StepNote) => (
            <Key
              key={key}
              note={note}
              step={step}
              state={state}
              label={label}
              onToggle={() => onToggleNote(note, step, state ? 0 : 1)}
              onMouseEnter={() =>
                paintMode !== "none" && handlePaint(note, step)
              }
              onMouseDown={() => handleMouseDown(note, step)}
            />
          )
        )}
        <div className="gs-grid__cursor" style={cursorStyle} />
      </div>
      <div className="gs-grid__toolbar">
        <button onClick={onClear}>Clear</button>
      </div>
    </div>
  );
};

export default Grid;
