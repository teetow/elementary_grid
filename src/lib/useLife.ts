import { useCallback, useContext, useEffect, useRef, useState } from "react";

import PlaybackContext from "./PlaybackContext";
import SessionContext from "./SessionContext";
import useAnimationFrame from "./useAnimationFrame";
import { clamp, deepCopy, range } from "./utils";

const getNeighbors = (x: number, y: number, field: number[][]) => {
  const maxX = field[0].length;
  const maxY = field.length;
  const [loX, hiX] = [clamp(x - 1, 0, maxX), clamp(x + 2, 0, maxX)];
  const [loY, hiY] = [clamp(y - 1, 0, maxY), clamp(y + 2, 0, maxY)];

  return range(hiY - loY, loY)
    .map((row) => range(hiX - loX, loX).map((col) => field[row][col]))
    .filter((row, rowindex) =>
      row.filter((col, colindex) => !(rowindex === y && colindex === x)),
    );
};

const calcCell = (x: number, y: number, field: number[][]) => {
  const cell = field[y][x];
  const adjacent = getNeighbors(x, y, field);
  const liveAdjacent = adjacent.flat().filter((cell) => cell !== 0);

  if (cell !== 0) {
    if (liveAdjacent.length === 2 || liveAdjacent.length === 3) return cell;
  } else {
    if (liveAdjacent.length === 3) return 1;
  }
  return 0;
};

const doLife = (field: number[][], col?: number) => {
  range(field.length).forEach((row) => {
    if (col) {
      field[row][col] = calcCell(col, row, field);
    } else {
      range(field[0].length).forEach((col) => {
        field[row][col] = calcCell(col, row, field);
      });
    }
  });
  return field;
};

type Props = {
  field: number[][];
  setField: (field: number[][]) => void;
};

const useLife = ({ field, setField }: Props) => {
  const nextField = useRef<number[][]>(deepCopy(field));
  const sessionCtx = useContext(SessionContext);
  const pbCtx = useContext(PlaybackContext);
  const [lastCol, setLastCol] = useState<number>(0);

  const refreshRate = sessionCtx.life ? 1000 / (pbCtx.bpm / 8) : 1000;
  useAnimationFrame(refreshRate, "life");

  const doRefresh = useCallback(() => {
    const col = pbCtx.playheadPos;
    const outField = deepCopy(field);
    range(field.length).forEach((y) => {
      outField[y][col] = nextField.current[y][col];
    });

    nextField.current = doLife(deepCopy(field));

    setField(outField);
    setLastCol(col);
  }, [field, pbCtx.playheadPos, setField]);

  useEffect(() => {
    if (lastCol === pbCtx.playheadPos || !sessionCtx.life) {
      return;
    }
    doRefresh();
  }, [doRefresh, lastCol, pbCtx.playheadPos, sessionCtx.life]);
};

export default useLife;
