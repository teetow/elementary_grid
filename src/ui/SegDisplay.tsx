import classNames from "classnames";
import { Children, ForwardedRef, PropsWithChildren, ReactNode, forwardRef } from "react";
import { Digit, Template } from "./SegDigit";
import "./SegDisplay.scss";

const ValidDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

type ValidDigit = typeof ValidDigits;

const isValidDigit = (digit: ReactNode): digit is ValidDigit => {
  if (typeof digit === "string") {
    return (ValidDigits as readonly string[]).includes(digit);
  }
  return false;
};

const cls = "eg-segdisplay";
type Props = PropsWithChildren<{}>;

const SegDisplay = forwardRef(
  ({ children }: Props, forwardedRef: ForwardedRef<HTMLDivElement>) => {
    const digits: { char: string; withdot: boolean }[] = [];

    Children.forEach(children, (childnode) => {
      if (typeof childnode === "string") {
        return childnode.split("").forEach((char, i, arr) => {
          if (isValidDigit(char)) {
            const withdot = arr[i + 1] == ".";
            digits.push({ char, withdot });
          }
        });
      } else return childnode;
    });

    return (
      <>
        <Template />
        <div ref={forwardedRef} className={`${cls}`}>
          {digits.map(({ char, withdot }, i) => (
            <Digit key={i} className={classNames(`d-${char}`, withdot && `dot`)} />
          ))}
        </div>
      </>
    );
  },
);

export default SegDisplay;

{
  /* <svg xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter
      id="glow"
      color-interpolation-filters="sRGB"
      x="-50%"
      y="-50%"
      width="200%"
      height="200%"
    >
      <title>Gaussian blur</title>
      <feGaussianBlur
        stdDeviation="2 1"
        edgeMode="none"
        in="SourceGraphic"
        result="gaussian-blur-0"
      ></feGaussianBlur>
      <feComposite
        result="composite-0"
        in="gaussian-blur-0"
        in2="SourceGraphic"
        operator="arithmetic"
        k2="0.7"
        k1="0.8"
        k3="0.3"
      ></feComposite>
    </filter>
  </defs>
  <rect
    x="47.01"
    y="3.27"
    width="575.77"
    height="245.1"
    style="stroke: rgb(0, 0, 0); fill: rgb(24, 17, 12);"
  ></rect>
  <text
    style="fill: rgb(234, 198, 24); font-family: Arial, sans-serif; font-size: 30.3px; white-space: pre; filter: url(#glow);"
    x="238.3"
    y="113.09"
  >
    123
  </text>
</svg>; */
}
