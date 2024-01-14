import { useContext, useRef } from "react";
import PlaybackContext, {
  SCOPE_BUF_SIZE,
  SCOPE_DATA_SIZE,
} from "../lib/PlaybackContext";
import useAnimationFrame from "../lib/useAnimationFrame";
import { mapRange } from "../lib/utils";
import "./Scope.scss";

const cls = "eg-scope";

type ScopeProps = {
  index: string;
  height?: number;
  lineWidth?: number;
  max?: number;
  min?: number;
  width?: number;
};

const Scope = ({
  index,
  height = 64,
  lineWidth,
  max = 1.1,
  min = -1.1,
  width = 560,
}: ScopeProps) => {
  const svgPoints = useRef("M0 0");
  const ctx = useContext(PlaybackContext);

  const doUpdate = () => {
    if (!(index in ctx.scope) || ctx.scope[index].length === 0) {
      return;
    }

    const allSamples = new Float32Array(
      ctx.scope[index].length * SCOPE_BUF_SIZE,
    );
    let bufOfs = 0;
    ctx.scope[index].map((buf) => {
      allSamples.set(buf, bufOfs);
      bufOfs += buf.length;
    });

    const skip = Math.max(1, Math.floor(SCOPE_DATA_SIZE / width));
    const samples: number[] = [];

    for (let i = 0; i < allSamples.length; i += skip) {
      samples.push(allSamples[i]);
    }

    svgPoints.current = samples
      .map((val, index) => {
        if (val === samples[index - 1] && val === samples[index + 1]) {
          return;
        }
        const yval = mapRange(val, min, max, -height / 2, height / 2);

        return `${index === 0 ? "M" : "L"}${index} ${yval * -1}`;
      })
      .join(" ");
  };

  useAnimationFrame(1000 / 60, "scope", doUpdate);

  return (
    <>
      <div className={`${cls}`}>
        <div className={`${cls}__label`}>{index}</div>
        <svg
          preserveAspectRatio="none"
          className={`${cls}__scope`}
          viewBox={`0 ${-height / 2} ${width} ${height}`}
          width="100%"
        >
          <path
            className={`${cls}__scopepath`}
            d={svgPoints.current}
            {...(lineWidth && { ...{ style: { strokeWidth: lineWidth } } })}
          />
        </svg>
      </div>
    </>
  );
};

export default Scope;
