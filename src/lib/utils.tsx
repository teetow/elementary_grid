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

export const makeScale = (
  scale: string[],
  numNotes: number = scale.length,
  octave = 4,
  octaveBreak = 0
) => {
  const noteNames = range(numNotes).map(
    (i) =>
      `${scale[i % scale.length]}${
        Math.floor((i - octaveBreak) / scale.length) + octave
      }`
  );
  return noteNames.flat().map(noteToMidi).map(midiToFrequency);
};

export const noteToMidi = (n: string) => {
  let notes = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let [_, name, octave] = n.match(
    /(?<name>\w?#?)(?<octave>\d)/
  ) as RegExpMatchArray;

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

export const bitsToNumber = (bits: number[]) => {
  return bits.reduce((prev, cur, i) => prev | (cur << i));
};

export const numberToBits = (number: number, length = 16) => {
  return range(length).map((i) => {
    const bit = 1 << i;
    return (number & bit) === bit ? 1 : 0;
  });
};
