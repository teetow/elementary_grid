import classNames from "classnames";
import {
  forwardRef,
  ForwardRefExoticComponent,
  MouseEventHandler,
} from "react";

type IconProps = {
  className?: string;
  onClick?: MouseEventHandler<SVGElement>;
};

type Icon = ForwardRefExoticComponent<
  IconProps & React.RefAttributes<SVGSVGElement>
>;

export const Blah = forwardRef<HTMLDivElement, IconProps>(
  ({ children }, ref) => {
    return <div ref={ref}>{children}</div>;
  },
);

<Blah ref={null} />;

const Icons: Record<string, Icon> = {
  Share: forwardRef<SVGSVGElement, IconProps>(({ onClick, className }, ref) => (
    <svg
      className={classNames(
        {
          "eg-svg": true,
          "eg-svg--has-hover": onClick !== undefined,
        },
        className,
      )}
      fill="none"
      height={24}
      width={20}
      onClick={onClick}
      viewBox="0 0 20 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 14.5V1.5M10 1.5L7 4.5M10 1.5L13 4.5"
        className="eg-svg__path eg-svg__path--stroked"
      />
      <path
        d="M6 9.5H4C2.89543 9.5 2 10.3954 2 11.5V20.5C2 21.6046 2.89543 22.5 4 22.5H16C17.1046 22.5 18 21.6046 18 20.5V11.5C18 10.3954 17.1046 9.5 16 9.5H14"
        className="eg-svg__path eg-svg__path--stroked"
      />
    </svg>
  )),
  Copy: forwardRef<SVGSVGElement, IconProps>(({ onClick, className }, ref) => (
    <svg
      ref={ref}
      className={classNames(
        {
          "eg-svg": true,
          "eg-svg--has-hover": onClick !== undefined,
        },
        className,
      )}
      height="24"
      width="24"
      onClick={onClick}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 3H6C4.89543 3 4 3.89543 4 5V16"
        className="eg-svg__path eg-svg__path--stroked"
      />
      <path
        d="M8 9C8 7.89543 8.89543 7 10 7H18C19.1046 7 20 7.89543 20 9V19C20 20.1046 19.1046 21 18 21H10C8.89543 21 8 20.1046 8 19V9Z"
        className="eg-svg__path eg-svg__path--stroked"
      />
    </svg>
  )),
};

export default Icons;
