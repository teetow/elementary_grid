import WebAudioRenderer from "@elemaudio/web-renderer";

import { PropsWithChildren, createContext, useState } from "react";

export const DEFAULTS_BPM = 123;

export type BpmContextProps = {
  bpm: number;
  setBpm?: React.Dispatch<React.SetStateAction<number>>;
};
export const BpmContext = createContext<BpmContextProps>({ bpm: 120 });
export const BpmContextProvider = ({ children }: PropsWithChildren) => {
  const [bpm, setBpm] = useState(99);
  return (
    <BpmContext.Provider value={{ bpm, setBpm }}>
      {children}
    </BpmContext.Provider>
  );
};

type PlaybackContextProps = {
  state: "playing" | "stopped";
  playheadPos: number;
  meters: Record<string, number>;
  scope: Record<string, Float32Array[]>;
  renderer: WebAudioRenderer | undefined;
};

const PlaybackContext = createContext<PlaybackContextProps>({
  state: "playing",
  playheadPos: 0,
  meters: {},
  scope: {},
  renderer: undefined,
});

export const SCOPE_NUM_BUFS = 127; // Number of buffers per scope
export const SCOPE_BUF_SIZE = 441; // size of each buffer
export const SCOPE_DATA_SIZE = SCOPE_NUM_BUFS * SCOPE_BUF_SIZE;

export default PlaybackContext;
