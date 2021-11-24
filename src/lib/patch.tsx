import { Reducer } from "react";
import { bitsToNumber, numberToBits } from "./utils";

export type Patch = {
  tracks: number[][];
  useKick: boolean;
  tone: string;
};

export type Action =
  | { type: "setTracks"; tracks: number[][] }
  | { type: "setTone"; tone: string }
  | { type: "setUseKick"; useKick: boolean };

export const patchReducer: Reducer<Patch, Action> = (patch, action) => {
  switch (action.type) {
    case "setTracks":
      return { ...patch, tracks: action.tracks };
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

  const noteParams = p.getAll("tracks");
  if (noteParams.length > 0) {
    try {
      const rslt = noteParams[0].split(",").map((s) => numberToBits(Number(s)));
      state.tracks = rslt;
    } catch (e) {
      console.log("Recall failed: ", e);
    }
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
};

export const setUrlState = (patch: Patch) => {
  const tracks = patch.tracks
    .map((track) => bitsToNumber(track).toString())
    .join(",");
  const kick = patch.useKick ? 1 : 0;
  const tone = patch.tone;
  const newLocation =
    window.location.pathname + `?tracks=${tracks}&kick=${kick}&tone=${tone}`;
  globalThis.history.replaceState(null, "", newLocation);
};
