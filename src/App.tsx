import { useCallback, useEffect, useReducer, useState } from "react";
import core from "./lib/elementary";

import { getUrlState, Patch, patchReducer, setUrlState } from "./lib/patch";
import { makeScale, range } from "./lib/utils";
import Grid from "./ui/Grid";
import Splainer from "./ui/Splainer";
import Synth from "./ui/Synth";

import "./App.scss";

const numTracks = 16;
const numSteps = 16;

const scale = makeScale(["c", "d", "f", "g", "a"], numTracks);
const bassNotes = ["c", "d", "f", "g", "a", "a#"];
const bassScale = makeScale(bassNotes, 7, 2);

let metroCallback = (source: string) => {};

core.on("load", () => {
  core.on("metro", (e: { source: string }) => {
    metroCallback(e.source);
  });
  core.on("error", (e: unknown) => {
    console.log(e);
  });
});

const initTracks = (height: number = numTracks) => {
  return Array.from(Array(height), () => new Array(numSteps).fill(0));
};

const getPatch = () => {
  return {
    tracks: initTracks(),
    bassTracks: initTracks(7),
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

  const toggleBassNote = useCallback(
    (note: number, step: number, value: number) => {
      const newTracks = [...patch.bassTracks];
      range(newTracks.length).forEach((i) => {
        newTracks[i][step] = 0;
      });
      newTracks[note][step] = value;

      updatePatch({ type: "setBassTracks", tracks: newTracks });
    },
    [patch.bassTracks]
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
        bassScale={bassScale}
        patch={patch}
        onClear={() => {
          updatePatch({ type: "setTracks", tracks: initTracks() });
          updatePatch({ type: "setBassTracks", tracks: initTracks(7) });
        }}
        onSetKick={(useKick) => updatePatch({ type: "setUseKick", useKick })}
        onSetTone={(tone) => updatePatch({ type: "setTone", tone })}
      />

      <Grid notes={patch.tracks} onToggleNote={toggleNote} hilightStep={tick} />
      <Grid
        notes={patch.bassTracks}
        onToggleNote={toggleBassNote}
        hilightStep={tick}
        color="blue"
      />
      <Splainer />
    </div>
  );
};

export default App;
