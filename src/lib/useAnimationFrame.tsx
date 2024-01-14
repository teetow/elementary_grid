import { useCallback, useEffect, useReducer, useRef } from "react";

const useAnimationFrame = (
  minInterval = 200,
  id: string,
  callback?: (time: number, delta: number) => void,
) => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const lastSeens = useRef<Record<string, number>>({});
  const handles = useRef<Record<string, number>>({});

  const update = useCallback(
    (time: number) => {
      const now = Date.now();
      if (!lastSeens.current[id]) {
        lastSeens.current[id] = now;
      }

      if (now - lastSeens.current[id] > minInterval) {
        forceUpdate();
        callback?.(now, now - lastSeens.current[id]);
        lastSeens.current[id] = now;
      }
      handles.current[id] = requestAnimationFrame(update);
    },
    [id, minInterval],
  );

  useEffect(() => {
    const handle = window.requestAnimationFrame(update);
    const savedHandles = handles.current;
    return () => {
      window.cancelAnimationFrame(handle);

      Object.values(savedHandles).forEach((handle) =>
        window.cancelAnimationFrame(handle),
      );
    };
  }, [update]);
};

export default useAnimationFrame;
