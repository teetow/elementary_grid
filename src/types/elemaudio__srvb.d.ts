// import srvb from "@elemaudio/srvb";

// let [outLeft, outRight] = srvb.srvb({name: 'myverb'}, 0.5, 0.5, 0.5, inLeft, inRight);
// Do whatever you like with outLeft, outRight

// srvb(props: Object, size: number, feedback: number, modDepth: number, inLeft: Node, inRight: Node

declare module "@elemaudio/srvb" {
  import { Node } from "@nick-thompson/elementary/src/core/node";

  export default function srvb(
    props: { name: string },
    size: number,
    feedback: number,
    modDepth: number,
    inLeft: Node,
    inRight: Node,
  ): [Node, Node];
}
