/* eslint-disable @typescript-eslint/no-unused-vars */
import { Reducer } from "react";

import base64table, { dec3bit, enc3bit } from "./encoding";
import { range } from "./utils";

export type Patch = {
  scale: number[];
  bassScale: number[];
  tracks: number[][];
  bassTracks: number[][];
  useKick: boolean;
  tone: string;
  mute?: boolean;
};

export type Action =
  | { type: "setScale"; scale: number[] }
  | { type: "setBassScale"; scale: number[] }
  | { type: "setTracks"; tracks: number[][] }
  | { type: "setBassTracks"; tracks: number[][] }
  | { type: "setTone"; tone: string }
  | { type: "setUseKick"; useKick: boolean }
  | { type: "setMute"; mute: boolean };

export const patchReducer: Reducer<Patch, Action> = (patch, action) => {
  switch (action.type) {
    case "setScale":
      return { ...patch, scale: action.scale };
    case "setBassScale":
      return { ...patch, scale: action.scale };
    case "setTracks":
      return { ...patch, tracks: action.tracks };
    case "setBassTracks":
      return { ...patch, bassTracks: action.tracks };
    case "setTone":
      return { ...patch, tone: action.tone };
    case "setUseKick":
      return { ...patch, useKick: action.useKick };
    case "setMute":
      return { ...patch, mute: action.mute };
    default:
      throw new Error(
        `Tried to perform ${action}, which is not a valid action`,
      );
  }
};

const parseBassNote = (s: string, i: number) => {
  let [noteVal, transpose] = s.split("t").map((val) => Number(val));

  noteVal = 1 << i === noteVal ? 1 : 0;

  if (noteVal === 1 && transpose !== undefined) {
    return transpose >= 1 ? transpose + 1 : transpose;
  }

  return noteVal;
};

export const clearUrlState = () => {
  globalThis.history.replaceState(null, "", globalThis.location.pathname);
};

export const getUrlState = () => {
  const state: Partial<Patch> = {};
  const p = new window.URLSearchParams(window.location.search);

  try {
    const tracksParams = p.getAll("tracks");
    if (tracksParams.length > 0) {
      state.tracks = tracksParams[0].split("-").map((s) => decodeTrack(s));
    }

    const bassParams = p.getAll("bassTracks");
    if (bassParams.length > 0) {
      let newTracks = range(7).map((i) =>
        bassParams[0].split(",").map((s) => parseBassNote(s, i)),
      );

      state.bassTracks = newTracks;
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

const getDelta = (val: number) => {
  if (val === 0 || val === 1) return val;
  return val > 1 ? val - 1 : val;
};

const decodeTrack = (track: string) => {
  if (track.length === 0) {
    return Array(16).fill(0);
  }

  const numSteps = track.length * 2;
  let decoded = Array(numSteps).fill(0);

  range(track.length).forEach((i) => {
    let combined = Object.values(base64table).indexOf(track[i]);
    const lo = combined & 0b000111;
    const hi = combined >> 3;
    decoded[i * 2] = dec3bit(lo);
    decoded[i * 2 + 1] = dec3bit(hi);
  });

  return decoded;
};

const encodeTrack = (track: number[]) => {
  const numSteps = track.length;
  const encoded = range(Math.floor(numSteps / 2)).map((i) => {
    let lo = track[i * 2];
    let hi = track[i * 2 + 1];
    lo = enc3bit(lo);
    hi = enc3bit(hi);
    let packed = lo | (hi << 3);

    return base64table[packed];
  });
  return encoded.join("");
};

export const encodeTracks = (tracks: number[][]) => {
  return tracks
    .map((track) => encodeTrack(track))
    .map((row) => (row === "AAAAAAAA" ? "" : row));
};

const encodeBassTracks = (tracks: number[][]) => {
  const numSteps = tracks[0].length;

  let noteVals = Array(numSteps).fill(0);
  let deltas = Array(numSteps).fill(0);

  range(numSteps).forEach((step) => {
    range(tracks.length).forEach((note) => {
      if (tracks[note][step] !== 0) {
        noteVals[step] = 1 << note;
        if (tracks[note][step] !== 1) {
          deltas[step] = getDelta(tracks[note][step]);
        }
      }
    });
  });

  return range(numSteps)
    .map((step) => {
      const d = deltas[step];
      const showDelta = d !== 0;
      return `${noteVals[step]}${showDelta ? "t" + d : ""}`;
    })
    .join(",");
};

export const encodeUrlParams = (patch: Patch) => {
  let out = "?";
  out += "&kick=" + (patch.useKick ? 1 : 0);
  out += "&tone=" + patch.tone;
  out += "&bassTracks=" + encodeBassTracks(patch.bassTracks);
  out += "&tracks=" + encodeTracks(patch.tracks).join("-");
  return out;
};

export const setUrlState = (patch: Patch) => {
  globalThis.history.replaceState(null, "", encodeUrlParams(patch));
};

const keys = {
  patch: "patch",
};

export const setLocalStorage = (patch: Patch) => {
  localStorage.setItem(keys.patch, JSON.stringify(patch));
};

export const getLocalStorage = <T extends unknown>() => {
  const storedData = localStorage.getItem(keys.patch);
  if (storedData) return JSON.parse(storedData) as T;
};
