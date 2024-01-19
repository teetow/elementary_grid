import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { BpmContext } from "../lib/PlaybackContext";
import "./BpmInput.scss";
import SegDisplay from "./SegDisplay";

const cls = "eg-bpm";
const THROTTLE_DELTA = 160;

const BpmInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const counterRef = useRef<HTMLInputElement>(null);
  const throttleRef = useRef<number>(-1);

  const { bpm, setBpm } = useContext(BpmContext);
  const [showInput, setShowInput] = useState(false);

  const shittyThrottle = (cb: CallableFunction, timeout = THROTTLE_DELTA) => {
    if (throttleRef.current) {
      window.clearTimeout(throttleRef.current);
    }
    throttleRef.current = window.setTimeout(cb, timeout);
  };

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      shittyThrottle(() => {
        setBpm?.((prev) => {
          let delta = e.deltaY > 0 ? -1 : 1;
          delta *= e.ctrlKey ? (e.shiftKey ? 0.01 : 0.1) : e.shiftKey ? 10 : 1.0;
          const newVal = Math.round((prev + delta) * 1000) / 1000;

          if (inputRef.current) {
            inputRef.current.value = newVal.toString();
          }
          return newVal;
        });
      }, 10);
    },
    [counterRef, inputRef],
  );

  const handleDoubleClick = useCallback(() => {
    setShowInput(true);
    window.setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  }, [counterRef]);

  useEffect(() => {
    const el = counterRef.current;
    el?.addEventListener("wheel", handleWheel, { capture: true });
    el?.addEventListener("dblclick", handleDoubleClick, { capture: true });
    return () => {
      el?.removeEventListener("wheel", handleWheel);
      el?.removeEventListener("dblclick", handleDoubleClick);
    };
  }, [counterRef]);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setShowInput(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const n = Number(e.target.value);
    shittyThrottle(() => setBpm?.(n), 100);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  return (
    <div className={`${cls}`}>
      <SegDisplay ref={counterRef}>
        {(Math.round(bpm * 1000) / 1000).toString()}
      </SegDisplay>

      {showInput && (
        <input
          className="eg-bpm__input"
          ref={inputRef}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          type="number"
          defaultValue={bpm}
          size={bpm.toString().length}
        />
      )}
    </div>
  );
};

export default BpmInput;
