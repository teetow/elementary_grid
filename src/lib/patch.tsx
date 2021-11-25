import { Reducer } from "react";
import { bitsToNumber, numberToBits } from "./utils";

export type Patch = {
  tracks: number[][];
  bassTracks: number[][];
  useKick: boolean;
  tone: string;
};

export type Action =
  | { type: "setTracks"; tracks: number[][] }
  | { type: "setBassTracks"; tracks: number[][] }
  | { type: "setTone"; tone: string }
  | { type: "setUseKick"; useKick: boolean };

export const patchReducer: Reducer<Patch, Action> = (patch, action) => {
  switch (action.type) {
    case "setTracks":
      return { ...patch, tracks: action.tracks };
    case "setBassTracks":
      return { ...patch, bassTracks: action.tracks };
    case "setTone":
      return { ...patch, tone: action.tone };
    case "setUseKick":
      return { ...patch, useKick: action.useKick };
    default:
      throw new Error(
        `Tried to perform ${action}, which is not a valid action`
      );
  }
};

export const getUrlState = () => {
  const state: Partial<Patch> = {};
  const p = new window.URLSearchParams(window.location.search);

  try {
    const tracksParams = p.getAll("tracks");
    if (tracksParams.length > 0) {
      state.tracks = tracksParams[0]
        .split(",")
        .map((s) => numberToBits(Number(s)));
    }

    const bassParams = p.getAll("bassTracks");
    if (bassParams.length > 0) {
      state.bassTracks = bassParams[0]
        .split(",")
        .map((s) => numberToBits(Number(s)));
    }

    const kickParams = p.getAll("kick");
    if (kickParams.length > 0) {
      state.useKick = Boolean(Number(kickParams[0]));
    }

    const presetParams = p.getAll("tone");
    if (presetParams.length > 0) {
      state.tone = presetParams[0];
    }
    return state;
  } catch (e) {
    console.log("Recall failed:", e);
  }
};

export const setUrlState = (patch: Patch) => {
  let out = "?";
  out += "tracks=" + patch.tracks.map(bitsToNumber);
  out += "&kick=" + (patch.useKick ? 1 : 0);
  out += "&tone=" + patch.tone;
  out += "&bassTracks=" + patch.bassTracks.map(bitsToNumber);
  globalThis.history.replaceState(null, "", out);
};
