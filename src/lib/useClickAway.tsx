import { RefObject, useCallback, useEffect } from "react";

const useClickAway = (
  element: RefObject<HTMLDivElement>,
  onClickAway: (e: MouseEvent) => void,
) => {
  const handleMouseDown = useCallback(
    (e: globalThis.MouseEvent, target: HTMLDivElement) => {
      if (!target.contains(e.target as Node)) {
        onClickAway(e);
      }
    },
    [onClickAway],
  );

  useEffect(() => {
    if (!element.current) {
      return;
    }
    const currentEl = element.current;
    const handler = (e: globalThis.MouseEvent) => handleMouseDown(e, currentEl);

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [element, handleMouseDown]);
};

export default useClickAway;
