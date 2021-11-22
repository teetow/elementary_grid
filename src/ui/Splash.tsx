import "./Splash.scss";

const PlayButton = () => {
  const blur = 3.3;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="eg-splash__playbutton"
      viewBox="0 0 24 24"
      fill="none"
      width="24"
      height="24"
    >
      <defs>
        <radialGradient
          id="grad"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(11 12) rotate(45) scale(7)"
        >
          <stop stopColor="var(--color-grad-s1)" />
          <stop offset="1" stopColor="var(--color-grad-s0)" />
        </radialGradient>
      </defs>

      <filter id="dropshadow" x="-100%" y="-100%" height="400%" width="400%">
        <feComponentTransfer in="SourceAlpha" result="alpha">
          <feFuncA type="linear" slope="0.4" />
        </feComponentTransfer>
        <feColorMatrix
          in="alpha"
          type="matrix"
          values="
      1 0 0 0 1
      0 1 0 0 0.5
      0 0 1 0 0.2
      0 0 0 1 0
      "
          result="mask"
        />
        <feGaussianBlur in="mask" stdDeviation={blur} />

        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <path
        className="eg-path__primary"
        d="M8 4L19 12L8 20Z"
        style={{ filter: "url(#dropshadow)" }}
      />
    </svg>
  );
};

export const Splash = ({ ...props }) => {
  return (
    <div className="eg-splash" {...props}>
      <h3 className="eg-splash__title">Hello.</h3>
      <PlayButton />
      <h3 className="eg-splash__title-2">Click this.</h3>
      <h3 className="eg-splash__title-3">It'll be fun.</h3>
    </div>
  );
};
