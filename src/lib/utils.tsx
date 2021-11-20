/**
 * Calculate the length, in ms, of one given subdivision at the specificed BPM
 * @param {*} tempo tempo in Beats Per Minute
 * @param {*} subDiv subdivision for which the length is sought, defaults to 16:th note
 * @returns the length of one subdivision in ms
 */
export const tempoToMs = (tempo: number, subDiv = 16) => {
  const beatLen = 1 / (tempo / 60);
  return ((beatLen * 4) / subDiv) * 1000;
};

export const makeScale = (scale: string[], numNotes: number, octave = 4) => {
  return range(numNotes)
    .map(
      (i) =>
        `${scale[i % scale.length]}${Math.floor(i / scale.length) + octave}`
    )
    .flat()
    .map(noteToMidi)
    .map(midiToFrequency);
};

export const noteToMidi = (n: string) => {
  let notes = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
  let [name, octave] = n.split("");

  if (notes.indexOf(name) < 0) return -1;

  return 12 * Number(octave) + notes.indexOf(name);
};

export const midiToFrequency = (m: number) => {
  if (m < 0) {
    return 0;
  }
  return 440 * Math.pow(2, (m - 69) / 12);
};

export const range = (n: number, start: number = 0) => [
  ...Array.from(Array(n).keys()).map((k) => k + start),
];

export const clamp = (n: number, min = 0, max = 1) =>
  Math.max(Math.min(n, max), min);
