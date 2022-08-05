declare module "@elemaudio/core" {
  import { el, ElementaryWebAudioRenderer, Node } from "@elemaudio/core";
  import { Elementary, NativeNode } from "@nick-thompson/elementary";
  /*
    Available from js:
    ElementaryNodeRenderer
    ElementaryPluginRenderer
    ElementaryWebAudioRenderer
    candyWrap
    el
    stdlib
    sugar
  */
  export type Node = NodeRepr_t & number;

  const el: Elementary & {
    metro: (props: { name: string; interval: number }) => Node;
    meter: (props: { name: string }, node: Node) => Node;
    snapshot: (props: { name: string }, trigger: Node, signal: Node) => Node;
    phasor: (rate: number | Node, train?: Node) => Node;
  };

  export type MeterEvent = {
    min: number;
    max: number;
    source?: string;
  };

  export { el, Node, MeterEvent, NativeNode, ElementaryWebAudioRenderer };
}
