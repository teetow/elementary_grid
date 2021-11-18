/**
 * Calculate the length, in ms, of one given subdivision at the specificed BPM
 * @param {*} tempo tempo in Beats Per Minute
 * @param {*} div subdivision for which the length is sought, defaults to 16:th note
 * @returns the length of one subdivision in ms
 */
export const beatLenFromTempo = (tempo: number, div = 16) => {
  const beatLen = 1 / (tempo / 60);
  return ((beatLen * 4) / div) * 1000;
};

export const freqFromTempo = (tempo: number, div = 16) => {
  const beatsPerSec = tempo / 60;
  return (beatsPerSec / 4) * div;
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

export const highestNote = (n: number) => {
  let c = 0;
  while (n > 0) {
    n = n >> 1;
    c += 1;
  }
  return c;
};

export const range = (n: number, start: number = 0) => [
  ...Array.from(Array(n).keys()).map((k) => k + start),
];
