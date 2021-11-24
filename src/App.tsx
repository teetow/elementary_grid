import { useCallback, useEffect, useReducer, useState } from "react";
import core from "./lib/elementary";

import { getUrlState, Patch, patchReducer, setUrlState } from "./lib/patch";
import { makeScale } from "./lib/utils";
import Grid from "./ui/Grid";
import Splainer from "./ui/Splainer";
import Synth from "./ui/Synth";

import "./App.scss";

const numTracks = 16;
const numSteps = 16;

const scale = makeScale(["c", "d", "f", "g", "a"], numTracks);

let metroCallback = (source: string) => {};

core.on("load", () => {
  core.on("metro", (e: { source: string }) => {
    metroCallback(e.source);
  });
});

const initTracks = () => {
  return Array.from(Array(numTracks), () => new Array(numSteps).fill(0));
};

const getPatch = () => {
  return {
    tracks: initTracks(),
    tone: "stab",
    useKick: false,
    ...getUrlState(),
  } as Patch;
};

const App = () => {
  const [patch, updatePatch] = useReducer(patchReducer, getPatch());
  const [tick, setTick] = useState<number>(0);

  const toggleNote = useCallback(
    (note: number, step: number, value: number) => {
      const newTracks = [...patch.tracks];
      newTracks[note][step] = value;

      updatePatch({ type: "setTracks", tracks: newTracks });
    },
    [patch.tracks]
  );

  useEffect(() => {
    setUrlState(patch);
  }, [patch]);

  const onTick = useCallback(
    (source: string) => {
      if (source === "sync") {
        setTick(0);
      } else if (source === "tick") {
        setTick((prev) => (prev + 1) % patch.tracks.length);
      }
    },
    [patch.tracks]
  );

  metroCallback = onTick;

  return (
    <div className="eg-app">
      <Synth
        scale={scale}
        patch={patch}
        onClear={() => updatePatch({ type: "setTracks", tracks: initTracks() })}
        onSetKick={(useKick) => updatePatch({ type: "setUseKick", useKick })}
        onSetTone={(tone) => updatePatch({ type: "setTone", tone })}
      />

      <Grid
        keyrange={16}
        notes={patch.tracks}
        onToggleNote={toggleNote}
        hilightStep={tick}
      />
      <Splainer />
    </div>
  );
};

export default App;
