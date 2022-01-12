import {
  Elementary,
  ElementaryWebAudioRenderer,
  Node,
} from "@nick-thompson/elementary";

declare module "@nick-thompson/elementary" {
  const el: Elementary & {
    metro: (props: { name: string; interval: number }) => Node;
  };

  export { el, ElementaryWebAudioRenderer, Node };
}
