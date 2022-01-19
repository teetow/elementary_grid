declare module "@elemaudio/core" {
  import { Elementary, Node, NativeNode } from "@nick-thompson/elementary";
  import { el, ElementaryWebAudioRenderer } from "@elemaudio/core";

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

  const el: Elementary & {
    metro: (props: { name: string; interval: number }) => Node;
    meter: (props: { name: string }, node: Node) => Node;
  };

  export type MeterEvent = {
    min: number;
    max: number;
    source?: string;
  };

  export { el, Node, NativeNode, ElementaryWebAudioRenderer };
}
