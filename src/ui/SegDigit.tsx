import classnames from "classnames";
import { CSSProperties, HTMLAttributes } from "react";

const cls = "eg-segdigit";

type Props = {
  className?: CSSProperties;
} & HTMLAttributes<SVGSVGElement>;

export const Template = () => (
  <>
    <svg
      className={`${cls}__template`}
      viewBox="0 0 80 107"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3 2" in="SourceGraphic" result="blurred" />
          <feComposite
            in="blurred"
            in2="SourceGraphic"
            operator="arithmetic"
            k1="1.0"
            k2="0.3"
            k3="0.2"
          />
        </filter>
        S
        <path
          id="a"
          d="M 31.3 13.2 C 31.4 13.3 31.5 13.4 31.6 13.4 L 62.9 13.4 C 63 13.4 63.2 13.3 63.3 13.2 L 72 5.8 C 72 5.7 72.1 5.6 72 5.5 C 70.7 4.4 70.2 4.4 67.9 4.3 L 29.6 4.3 C 27.9 4.3 27.6 4.5 25.2 5.5 C 25.1 5.6 25 5.7 25.1 5.8 L 31.3 13.2 Z"
        />
        <path
          id="b"
          d="M 74.1 8.1 C 74 7.9 73.9 8 73.9 8 L 65.1 15.5 C 65.1 15.6 65 15.7 64.9 15.9 L 59.5 45.6 C 59.5 45.7 59.5 45.8 59.6 45.9 L 63.1 50.2 C 63.2 50.3 63.3 50.3 63.4 50.2 L 68.4 46 C 68.5 45.9 68.6 45.8 68.6 45.6 L 74.6 12.2 C 74.6 12.2 74.9 10.8 74.7 9.9 C 74.6 8.8 74.1 8.1 74.1 8.1 Z"
        />
        <path
          id="c"
          d="M 62.5 55 C 62.4 54.9 62.2 54.9 62.2 55 L 57.1 59.2 C 57 59.3 57 59.5 56.9 59.6 L 51.5 89.3 C 51.5 89.5 51.5 89.6 51.6 89.7 L 58.2 97.6 C 58.3 97.7 58.4 97.7 58.4 97.6 C 58.6 97.3 59.3 96.5 59.7 94.7 L 66 59.6 C 66 59.4 66 59.3 65.9 59.2 L 62.5 55 Z"
        />
        <path
          id="d"
          d="M 7.8 99.9 C 7.7 99.9 7.7 100.1 7.8 100.1 C 7.8 100.1 9.1 100.7 10.7 100.7 L 52.2 100.7 C 54.5 100.7 55.5 100.1 55.5 100.1 C 55.6 100 55.6 99.9 55.5 99.9 L 49 92 C 49 92 48.9 91.8 48.6 91.8 L 17.4 91.8 C 17.2 91.8 17 92 17 92 L 7.8 99.9 Z"
        />
        <path
          id="e"
          d="M 17.2 55 C 17.1 54.9 17 54.9 16.9 55 L 11.9 59.2 C 11.8 59.4 11.7 59.4 11.7 59.6 L 5.4 94.5 C 5.4 94.5 5.3 95.1 5.3 95.9 C 5.3 96.7 5.6 97.6 5.6 97.6 C 5.6 97.6 5.7 97.8 5.9 97.6 L 15.1 89.7 C 15.3 89.5 15.3 89.3 15.3 89.3 L 20.7 59.6 C 20.7 59.4 20.7 59.3 20.6 59.2 L 17.2 55 Z"
        />
        <path
          id="f"
          d="M 22.5 8 C 22.4 8 22.3 8 22.2 8.1 C 21.2 9 20.9 9.5 20.3 12.2 L 14.3 45.6 C 14.3 45.7 14.3 45.8 14.4 46 L 17.8 50.2 C 17.9 50.3 18 50.2 18.1 50.2 L 23.1 46 C 23.2 45.9 23.3 45.7 23.3 45.6 L 28.8 15.9 C 28.8 15.7 28.8 15.5 28.7 15.4 L 22.5 8 Z"
        />
        <path
          id="g"
          d="M 20 52.5 L 19.9 52.5 L 19.9 52.6 L 19.9 52.7 L 23.3 57 C 23.3 57 23.5 57.1 23.7 57.1 L 54.9 57.1 C 55.1 57.1 55.3 57 55.3 57 L 60.3 52.7 C 60.4 52.7 60.4 52.5 60.4 52.5 L 56.9 48.2 C 56.9 48.2 56.8 48.1 56.6 48.1 L 25.4 48.1 C 25.2 48.1 25.1 48.1 25 48.2 L 20 52.5 Z"
        />
        <circle id="p" r={7} cx={72} cy={99} />
      </defs>
    </svg>
  </>
);

export const Digit = ({ className }: Props) => (
  <>
    <svg
      className={classnames("eg-segdigit", className)}
      viewBox="0 0 80 107"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <use className={`${cls}__path`} id="a" href="#a"></use>
      <use className={`${cls}__path`} id="b" href="#b"></use>
      <use className={`${cls}__path`} id="c" href="#c"></use>
      <use className={`${cls}__path`} id="d" href="#d"></use>
      <use className={`${cls}__path`} id="e" href="#e"></use>
      <use className={`${cls}__path`} id="f" href="#f"></use>
      <use className={`${cls}__path`} id="g" href="#g"></use>
      <use className={`${cls}__path`} id="p" href="#p"></use>
    </svg>
  </>
);
