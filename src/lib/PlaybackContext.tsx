import WebAudioRenderer from "@elemaudio/web-renderer";

import { createContext } from "react";

type PlaybackContextProps = {
  state: "playing" | "stopped";
  playheadPos: number;
  bpm: number;
  meters: Record<string, number>;
  renderer: WebAudioRenderer | undefined;
};

const PlaybackContext = createContext<PlaybackContextProps>({
  state: "playing",
  playheadPos: 0,
  bpm: 120,
  meters: {},
  renderer: undefined,
});

export default PlaybackContext;
