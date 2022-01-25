import { createContext } from "react";

type PlaybackContextProps = {
  state: "playing" | "stopped";
  playheadPos: number;
  bpm: number;
  meters: Record<string, number>;
};

const PlaybackContext = createContext<PlaybackContextProps>({
  state: "playing",
  playheadPos: 0,
  bpm: 120,
  meters: {},
});

export default PlaybackContext;
