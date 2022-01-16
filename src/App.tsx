import { ElementaryWebAudioRenderer as core } from "@nick-thompson/elementary";
import { useCallback, useEffect, useReducer, useState } from "react";
import "./App.scss";
import {
  getLocalStorage,
  Patch,
  patchReducer,
  setLocalStorage,
} from "./lib/patch";
import { initArray, makeScale, range } from "./lib/utils";
import Grid from "./ui/Grid";
import Splainer from "./ui/Splainer";
import Synth from "./ui/Synth";

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
  return initArray(height, numSteps);
};

const getPatch = () => {
  return {
    tracks: initTracks(),
    bassTracks: initTracks(7),
    tone: "stab",
    useKick: false,
    ...getLocalStorage(),
  } as Patch;
};

const initialPatch = getPatch();

const App = () => {
  const [patch, updatePatch] = useReducer(patchReducer, initialPatch);
  const [tick, setTick] = useState<number>(0);

  const toggleNote = useCallback(
    (note: number, step: number, value: number) => {
      const newTracks = [...patch.tracks];
      newTracks[note][step] = value;

      updatePatch({ type: "setTracks", tracks: newTracks });
    },
    [patch.tracks],
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
    [patch.bassTracks],
  );

  useEffect(() => {
    setLocalStorage(patch);
  }, [patch]);

  const onTick = useCallback(
    (source: string) => {
      if (source === "sync") {
        setTick(0);
      } else if (source === "tick") {
        setTick((prev) => (prev + 1) % patch.tracks.length);
      }
    },
    [patch.tracks.length],
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
      <Grid
        canTranspose={true}
        hilightStep={tick}
        notes={patch.tracks}
        onSetNotes={(notes) => {
          updatePatch({ type: "setTracks", tracks: notes });
        }}
        onToggleNote={toggleNote}
      />

      <Grid
        canTranspose={true}
        color="blue"
        hilightStep={tick}
        notes={patch.bassTracks}
        onSetNotes={(notes) =>
          updatePatch({ type: "setBassTracks", tracks: notes })
        }
        onToggleNote={toggleBassNote}
      />
      <Splainer />
    </div>
  );
};

export default App;
