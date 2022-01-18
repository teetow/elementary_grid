import { el, ElementaryWebAudioRenderer as core, Node } from "@elemaudio/core";

import { midiToFrequency, noteToMidi } from "../lib/utils";

const drums = [
  [1, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
];

let bassNotes = `
g3,a3,a2,a2,
a2,a2,a2,a2,
c3,a2,d3,a2,
d#3,e3,a2,d3,
d3,e3,e2,e2,
e2,e2,e2,e2,
f#2,e2,g2,e2,
g2,g#2,e2,e2
`;

let bassTriggers = [1, 1, 0, 1];
bassNotes = `a2,a3,--,a3`;

const freqs = bassNotes
  .split(",")
  .map((s) => s.trim())
  .filter((s) => s.length >= 2)
  .map((x) => (x !== "--" ? noteToMidi(x) : 0))
  .map((x) => (x > 0 ? midiToFrequency(x) : 0));

const Bass = (gate: Node) => {
  let trig = el.seq({ seq: bassTriggers }, gate);
  let bassSeq = el.seq({ seq: freqs.filter((x) => x > 0), hold: true }, trig);

  let env = el.adsr(0.01, 0.8, 0.6, 0.1, trig);
  let env2 = el.adsr(0.01, 0.5, 0.1, 0.1, trig);
  let env3 = el.adsr(0.01, 0.3, 0.1, 0.1, trig);

  let osc = el.add(
    el.mul(0.7, env, el.blepsaw(el.mul(1.0, bassSeq))),
    el.mul(0.4, env2, el.cycle(bassSeq)),
    el.mul(0.2, env3, el.cycle(el.mul(2.0, bassSeq))),
  );

  // uncomment for 303 deliciousness
  // let cutoffEnv = el.add(1, el.mul(500, el.adsr(0.01, 0.2, 0.1, 0.1, trig)));
  let cutoffEnv = el.const({ key: "bassCutoff", value: 0 });
  osc = el.lowpass(el.mul(8, el.add(cutoffEnv, bassSeq)), 64.0, osc);
  osc = el.highpass(el.mul(1, bassSeq), 32.0, osc);

  osc = el.mul(0.2, osc);
  return osc;
};

const kick = (gate: Node) => {
  const kickSeq = el.seq({ seq: drums[0] }, gate);

  const slowPitchEnv = el.adsr(0.001, 0.12, 0.1, 0.2, kickSeq);
  const ampEnv = el.adsr(0.003, 0.7, 0.5, 0.2, kickSeq);

  let sweep = el.cycle(
    el.mul(40, el.mul(5.0, el.add(0.23, el.mul(slowPitchEnv)))),
  );
  let out = el.mul(sweep, ampEnv);

  out = el.highpass(50, 1.0, out);
  out = el.lowpass(5200, 1.0, out);
  return out;
};

const snare = (gate: Node, { root = 160 } = {}) => {
  let seq = el.seq({ seq: drums[1] }, gate);

  let snapPitchEnv = el.adsr(0.001, 0.5, 0.1, 0.1, seq);
  let snapAmpEnv = el.adsr(0.001, 0.05, 0.001, 0.1, seq);
  let snap = el.square(el.mul(200, snapPitchEnv));

  let pitchEnv = el.adsr(0.005, 0.01, 0.0, 0.0, seq);
  let ampEnv = el.adsr(0.001, 0.8, 0.2, 0.3, seq);

  let osc = (freq: number, gain = 1.0) =>
    el.mul(gain, el.cycle(el.mul(freq, el.add(1, pitchEnv))));

  let body = el.add(
    osc(root, 1),
    osc(root * 1.33, 0.6),
    osc(root * 1.32, 0.6),
    osc(root * 10, 0.1),
    osc(root * 10.05, 0.1),
    osc(root * 11, 0.02),
    osc(root * 11.01, 0.02),
  );

  let hiss = el.noise();
  let noiseEnv = el.adsr(0.05, 0.5, 0.3, 0.5, seq);

  let out = el.add(
    el.const({ value: 0 }),
    el.mul(1.3, snapAmpEnv, snap),
    el.mul(0.3, noiseEnv, hiss),
    el.mul(0.3, ampEnv, body),
  );
  return out;
};

const Debugger = () => {
  let tick = el.train(5);

  let osc = Bass(tick);

  let drums = el.add(el.mul(0.6, snare(tick)), el.mul(0.6, kick(tick)));
  drums = el.min(2.1, drums);
  drums = el.mul(0.7, drums);

  osc = el.add(drums, osc);

  osc = el.min(1.0, osc);
  core.render(osc, osc);
  return <></>;
};

export default Debugger;
