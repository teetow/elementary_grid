import { ElementaryWebAudioRenderer as core } from "@nick-thompson/elementary";
import { useSynth } from "lib/useSynth";
import { useCallback, useEffect, useReducer, useState } from "react";

import {
  encodeTracks,
  encodeUrlParams,
  getLocalStorage,
  Patch,
  patchReducer,
  setLocalStorage,
} from "./lib/patch";
import { initArray, makeScale, range } from "./lib/utils";
import Grid from "./ui/Grid";
import Panel from "./ui/Panel";
import Splainer from "./ui/Splainer";

import "./App.scss";

const numTracks = 16;
const numSteps = 16;

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
    scale: makeScale(["c", "d", "f", "g", "a"], numTracks),
    bassScale: makeScale(["c", "d", "f", "g", "a", "a#"], 7, 2),
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

  useSynth({
    scale: patch.scale,
    bassScale: patch.bassScale,
    tone: patch.tone,
    tracks: patch.tracks,
    bassTracks: patch.bassTracks,
    withKick: patch.useKick,
    mute: patch.mute,
  });

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
      <Panel
        patch={patch}
        onClear={() => {
          updatePatch({ type: "setTracks", tracks: initTracks() });
          updatePatch({ type: "setBassTracks", tracks: initTracks(7) });
        }}
        onSetKick={(useKick) => updatePatch({ type: "setUseKick", useKick })}
        onSetTone={(tone) => updatePatch({ type: "setTone", tone })}
        onSetMute={(mute) => updatePatch({ type: "setMute", mute })}
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
      <pre>
        {JSON.stringify(
          encodeTracks(patch.tracks).map((row) => row.join(" ")),
          null,
          2,
        )}
      </pre>
    </div>
  );
};

export default App;
