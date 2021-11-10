export type Note = {
  pitch: number;
  note_number: number;
  label: string;
};

export const getTestSequence = (length: 16) => {
  const steps: Array<number> = new Array(length).fill(8);

  return steps;
};
