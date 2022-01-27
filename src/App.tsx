import { ElementaryWebAudioRenderer as core } from "@elemaudio/core";
import { useSynth } from "lib/useSynth";
import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  clearUrlState,
  getLocalStorage,
  getUrlState,
  Patch,
  patchReducer,
  setLocalStorage,
} from "./lib/patch";

import { initArray, makeScale, range } from "./lib/utils";
import Grid from "./ui/Grid";
import Panel from "./ui/Panel";
import Splainer from "./ui/Splainer";

import "./App.scss";
import SessionContext from "lib/SessionContext";
import useLife from "lib/useLife";

const numTracks = 16;
const numSteps = 16;

core.on("load", () => {
  core.on("error", (e: unknown) => {
    console.log(e);
  });
});

const initTracks = (height: number = numTracks) => {
  return initArray(height, numSteps);
};

const getInitialPatch = () => {
  let patchData = {
    scale: makeScale(["c", "d", "f", "g", "a"], numTracks),
    bassScale: makeScale(["c", "d", "f", "g", "a", "a#"], 7, 2),
    tracks: initTracks(),
    bassTracks: initTracks(7),
    tone: "stab",
    useKick: false,
  } as Patch;

  const urlPatch = getUrlState();
  if (urlPatch && Object.keys(urlPatch).length !== 0) {
    patchData = { ...patchData, ...(urlPatch as Patch) };
  } else {
    const storedPatch = getLocalStorage<Patch>();
    if (storedPatch) {
      patchData = storedPatch;
    }
  }
  clearUrlState();

  return patchData;
};

const initialPatch = getInitialPatch();

const App = () => {
  const [patch, updatePatch] = useReducer(patchReducer, initialPatch);

  const sessionCtx = useContext(SessionContext);
  [sessionCtx.mute, sessionCtx.setMute] = useState<boolean>(false);
  [sessionCtx.life, sessionCtx.setLife] = useState<boolean>(false);

  useSynth({
    scale: patch.scale,
    bassScale: patch.bassScale,
    tone: patch.tone,
    tracks: patch.tracks,
    bassTracks: patch.bassTracks,
    withKick: patch.useKick,
    mute: sessionCtx.mute,
  });

  const handleLife = useCallback((field) => {
    updatePatch({ type: "setTracks", tracks: field });
  }, []);

  useLife({
    field: patch.tracks,
    setField: handleLife,
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

  return (
    <div className="eg-app">
      <Panel
        patch={patch}
        onClear={useCallback(() => {
          updatePatch({ type: "setTracks", tracks: initTracks() });
          updatePatch({ type: "setBassTracks", tracks: initTracks(7) });
        }, [])}
        onSetKick={useCallback(
          (useKick) => updatePatch({ type: "setUseKick", useKick }),
          [],
        )}
        onSetTone={useCallback(
          (tone) => updatePatch({ type: "setTone", tone }),
          [],
        )}
      />
      <Grid
        canTranspose={true}
        notes={patch.tracks}
        onSetNotes={useCallback((notes) => {
          updatePatch({ type: "setTracks", tracks: notes });
        }, [])}
        onToggleNote={toggleNote}
      ></Grid>

      <Grid
        canTranspose={true}
        color="blue"
        notes={patch.bassTracks}
        onSetNotes={useCallback(
          (notes) => updatePatch({ type: "setBassTracks", tracks: notes }),
          [],
        )}
        onToggleNote={toggleBassNote}
      />
      <Splainer />
    </div>
  );
};

export default App;
