import {
  Elementary,
  ElementaryWebAudioRenderer,
  Node,
} from "@nick-thompson/elementary";

declare module "@nick-thompson/elementary" {
  const el: Elementary & {
    metro: (props: { name: string; interval: number }) => Node;
    meter: (props: { name: string }, node: Node) => Node;
  };

  export type MeterEvent = {
    min: number;
    max: number;
    source?: string;
  };

  export { el, ElementaryWebAudioRenderer, Node };
}
