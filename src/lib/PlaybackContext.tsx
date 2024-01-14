import WebAudioRenderer from "@elemaudio/web-renderer";

import { createContext } from "react";

type PlaybackContextProps = {
  state: "playing" | "stopped";
  playheadPos: number;
  bpm: number;
  meters: Record<string, number>;
  scope: Record<string, Float32Array[]>;
  renderer: WebAudioRenderer | undefined;
};

const PlaybackContext = createContext<PlaybackContextProps>({
  state: "playing",
  playheadPos: 0,
  bpm: 120,
  meters: {},
  scope: {},
  renderer: undefined,
});

export const SCOPE_NUM_BUFS = 127; // Number of buffers per scope
export const SCOPE_BUF_SIZE = 441; // size of each buffer
export const SCOPE_DATA_SIZE = SCOPE_NUM_BUFS * SCOPE_BUF_SIZE;

export default PlaybackContext;
