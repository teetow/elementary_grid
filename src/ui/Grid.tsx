import classnames from "classnames";
import { CSSProperties, memo, useCallback, useEffect, useState } from "react";

import { range } from "../lib/utils";

import "./Grid.scss";

type KeyProps = {
  note: number;
  state: boolean;
  step: number;
  hasHilight?: boolean;
  onDrawStart: (note: number, step: number) => void;
  onDrawEnter: (note: number, step: number) => void;
};

const Key = memo(
  ({ hasHilight, note, state, step, onDrawStart, onDrawEnter }: KeyProps) => {
    const handleMouseDown = useCallback(
      () => onDrawStart(note, step),
      [note, onDrawStart, step]
    );

    const handleMouseEnter = useCallback(
      () => onDrawEnter(note, step),
      [note, onDrawEnter, step]
    );

    const keyClasses = classnames({
      "eg-key": true,
      "eg-key--is-active": state,
      "eg-key--has-hilight": hasHilight,
    });

    const keyStyle = {
      "--step": step,
      "--note": note,
    } as CSSProperties;

    return (
      <div
        className={keyClasses}
        style={keyStyle}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
      />
    );
  }
);

type FieldProps = {
  notes: number[][];
  onToggleNote: (note: number, step: number, mode: number) => void;
};

const Field = ({ notes, onToggleNote }: FieldProps) => {
  const [paintMode, setPaintMode] = useState<PaintMode>("none");

  const handleMouseUp = useCallback(() => setPaintMode("none"), []);

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

  const handleDrawStart = useCallback(
    (note: number, step: number) => {
      if (notes[note][step] === 0) {
        onToggleNote(note, step, 1);
        setPaintMode("fill");
      } else {
        onToggleNote(note, step, 0);
        setPaintMode("clear");
      }
    },
    [notes, onToggleNote]
  );

  const handlePaint = useCallback(
    (note: number, step: number) => {
      if (paintMode === "fill" && notes[note][step] === 0) {
        onToggleNote(note, step, 1);
      }

      if (paintMode === "clear" && notes[note][step] === 1) {
        onToggleNote(note, step, 0);
      }
    },
    [notes, onToggleNote, paintMode]
  );

  return (
    <>
      {range(notes.length).map((note) => {
        return range(notes[0].length).map((step) => {
          const state = notes[note][step] === 1;
          const key = `${note}_${step}_${state ? "on" : "off"}`;
          return (
            <Key
              key={key}
              note={note}
              state={state}
              step={step}
              onDrawStart={handleDrawStart}
              onDrawEnter={handlePaint}
            />
          );
        });
      })}
    </>
  );
};

type PaintMode = "none" | "fill" | "clear";

type Props = {
  notes: number[][];
  color?: "yellow" | "blue";
  hilightStep?: number;
  onToggleNote: (note: number, step: number, mode: number) => void;
};

const Grid = ({
  notes,
  color = "yellow",
  hilightStep,
  onToggleNote,
}: Props) => {
  const fieldClasses = classnames({
    "eg-grid": true,
    [`eg-grid--color-${color}`]: color !== undefined,
  });

  const fieldStyle = {
    "--columns": notes[0].length,
    "--rows": notes.length,
  } as CSSProperties;

  const cursorStyle = {
    "--cursor": hilightStep,
  } as CSSProperties;

  return (
    <div className={fieldClasses} style={fieldStyle}>
      <Field notes={notes} onToggleNote={onToggleNote} />
      <div className="eg-grid__cursor" style={cursorStyle} />
    </div>
  );
};

export default Grid;
