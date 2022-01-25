import classnames from "classnames";
import PlaybackContext from "lib/PlaybackContext";
import useAnimationFrame from "lib/useAnimationFrame";
import {
  CSSProperties,
  FunctionComponent,
  memo,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  WheelEvent,
} from "react";

import { clamp, deepCopy, range, shiftArray } from "../lib/utils";

import "./Grid.scss";

type KeyProps = {
  hasHilight?: boolean;
  note: number;
  state: boolean;
  step: number;
  transpose?: number;
  onDrawEnter: (note: number, step: number) => void;
  onDrawStart: (note: number, step: number) => void;
  onTranspose?: (note: number, step: number, delta: number) => void;
};

const Key = memo(
  ({
    hasHilight,
    note,
    state,
    step,
    transpose,
    onDrawEnter,
    onDrawStart,
    onTranspose,
  }: KeyProps) => {
    const handleMouseDown = useCallback(
      () => onDrawStart(note, step),
      [note, onDrawStart, step],
    );

    const handleMouseEnter = useCallback(
      () => onDrawEnter(note, step),
      [note, onDrawEnter, step],
    );

    const handleWheel = useCallback(
      (e: WheelEvent) => {
        if (!e.shiftKey) return;
        onTranspose?.(note, step, e.deltaY < 0 ? 1 : -1);
      },
      [note, onTranspose, step],
    );

    const keyClasses = classnames({
      "eg-key": true,
      "eg-key--is-active": state,
      "eg-key--has-hilight": hasHilight,
    });

    const keyStyle = {
      "--step": step,
      "--note": note,
      "--transpose": transpose !== 0,
    } as CSSProperties;

    const labelClasses = classnames({
      "eg-key__label": true,
      "eg-key__label--transpose-up": transpose !== undefined && transpose > 0,
      "eg-key__label--transpose-dn": transpose !== undefined && transpose < 0,
    });

    return (
      <div
        className={keyClasses}
        style={keyStyle}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onWheel={onTranspose !== undefined ? handleWheel : undefined}
      >
        {transpose !== 0 && (
          <div className={labelClasses}>
            <span>{transpose}</span>
          </div>
        )}
      </div>
    );
  },
);

type FieldProps = {
  notes: number[][];
  canTranspose?: boolean;
  onToggleNote: (note: number, step: number, mode: number) => void;
};

const Field = ({ notes, canTranspose, onToggleNote }: FieldProps) => {
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
    [notes, onToggleNote],
  );

  const handlePaint = useCallback(
    (note: number, step: number) => {
      console.log(paintMode);
      if (paintMode === "fill" && notes[note][step] === 0) {
        onToggleNote(note, step, 1);
      }

      if (paintMode === "clear" && notes[note][step] !== 0) {
        onToggleNote(note, step, 0);
      }
    },
    [notes, onToggleNote, paintMode],
  );

  const handleTranspose = useCallback(
    (note: number, step: number, delta: number) => {
      let val = notes[note][step];
      if (val === 0) {
        return;
      }

      val += val === -delta ? delta * 2 : delta;
      val = clamp(val, -2, 3);

      onToggleNote(note, step, val);
    },
    [notes, onToggleNote],
  );

  const getTranspose = (val: number) => (val > 0 ? val - 1 : val);

  return (
    <>
      {range(notes.length).map((note) => {
        return range(notes[0].length).map((step) => {
          const state = notes[note][step] !== 0;
          const key = `${note}_${step}_${state ? "on" : "off"}`;
          return (
            <Key
              key={key}
              note={note}
              state={state}
              step={step}
              transpose={canTranspose ? getTranspose(notes[note][step]) : 0}
              onDrawStart={handleDrawStart}
              onDrawEnter={handlePaint}
              onTranspose={canTranspose ? handleTranspose : undefined}
            />
          );
        });
      })}
    </>
  );
};

type PaintMode = "none" | "fill" | "clear";

export const Playhead = () => {
  const ctx = useContext(PlaybackContext);

  useAnimationFrame(1000 / 60, "playhead");

  const cursorStyle = {
    "--cursor": ctx.playheadPos,
  } as CSSProperties;

  return <div className="eg-grid__cursor" style={cursorStyle} />;
};

type Props = PropsWithChildren<{
  notes: number[][];
  color?: "yellow" | "blue";
  hilightStep?: number;
  canTranspose?: boolean;
  onToggleNote: (note: number, step: number, mode: number) => void;
  onSetNotes: (notes: number[][]) => void;
}>;

const Grid: FunctionComponent<Props> = ({
  children,
  notes,
  color = "yellow",
  canTranspose,
  onToggleNote,
  onSetNotes,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const fieldClasses = classnames({
    "eg-grid": true,
    [`eg-grid--color-${color}`]: color !== undefined,
  });

  const fieldStyle = {
    "--columns": notes[0].length,
    "--rows": notes.length,
  } as CSSProperties;

  const handleWheel = useCallback(
    (e: globalThis.WheelEvent) => {
      if (e.altKey && e.shiftKey) {
        e.preventDefault();
        e.stopImmediatePropagation();
        onSetNotes(
          deepCopy(notes).map((row: number[]) =>
            shiftArray(row, e.deltaY > 0 ? 1 : -1),
          ),
        );
      } else if (e.altKey) {
        e.preventDefault();
        onSetNotes(shiftArray(deepCopy(notes), e.deltaY > 0 ? 1 : -1));
      }
    },
    [notes, onSetNotes],
  );

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const savedRef = ref.current;
    savedRef.addEventListener("wheel", handleWheel, { passive: false });
    return () => savedRef.removeEventListener("wheel", handleWheel);
  }, [handleWheel, ref]);

  return (
    <div ref={ref} className={fieldClasses} style={fieldStyle}>
      <Field
        canTranspose={canTranspose}
        notes={notes}
        onToggleNote={onToggleNote}
      />
      <Playhead />
      {children}
    </div>
  );
};

export default Grid;
