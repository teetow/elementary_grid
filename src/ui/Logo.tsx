import PlaybackContext from "lib/PlaybackContext";
import useAnimationFrame from "lib/useAnimationFrame";

import { clamp } from "lib/utils";
import { CSSProperties, memo, useContext } from "react";

import "./Logo.scss";

const LogoTitle = () => {
  return (
    <svg
      className="eg-logo__text"
      viewBox="-4 2 94 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <radialGradient
        id="grad-text"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(20 0) rotate(10.5392) scale(42.4514 15.2674)"
      >
        <stop stopColor="var(--gd-text-s0)" />
        <stop offset="1" stopColor="var(--gd-text-s1)" />
      </radialGradient>

      <g id="text" transform="translate(-3 0)">
        <path
          d="M5.28333 7.69336H2.15247V10.332H5.85754V12H0.1427V2.04688H5.84387V3.72168H2.15247V6.07324H5.28333V7.69336Z"
          fill="url(#grad-text)"
        />
        <path
          d="M10.0094 10.332H13.5368V12H7.99965V2.04688H10.0094V10.332Z"
          fill="url(#grad-text)"
        />
        <path
          d="M20.8195 7.69336H17.6886V10.332H21.3937V12H15.6789V2.04688H21.38V3.72168H17.6886V6.07324H20.8195V7.69336Z"
          fill="url(#grad-text)"
        />
        <path
          d="M26.1608 2.04688L28.0407 9.24512L29.9138 2.04688H32.5388V12H30.5222V9.30664L30.7067 5.15723L28.7175 12H27.3503L25.361 5.15723L25.5456 9.30664V12H23.5358V2.04688H26.1608Z"
          fill="url(#grad-text)"
        />
        <path
          d="M40.2795 7.69336H37.1486V10.332H40.8537V12H35.1389V2.04688H40.84V3.72168H37.1486V6.07324H40.2795V7.69336Z"
          fill="url(#grad-text)"
        />
        <path
          d="M49.9548 12H47.945L45.0056 5.47168V12H42.9958V2.04688H45.0056L47.9519 8.58203V2.04688H49.9548V12Z"
          fill="url(#grad-text)"
        />
        <path
          d="M58.7893 3.72168H56.3284V12H54.3118V3.72168H51.8918V2.04688H58.7893V3.72168Z"
          fill="url(#grad-text)"
        />
        <path
          d="M64.8552 9.96289H62.114L61.5808 12H59.4548L62.5652 2.04688H64.4041L67.5349 12H65.3884L64.8552 9.96289ZM62.5515 8.28809H64.4109L63.4812 4.74023L62.5515 8.28809Z"
          fill="url(#grad-text)"
        />
        <path
          d="M72.4661 8.36328H71.468V12H69.4583V2.04688H72.6643C73.6715 2.04688 74.4485 2.30892 74.9954 2.83301C75.5468 3.35254 75.8225 4.0931 75.8225 5.05469C75.8225 6.3763 75.3417 7.30143 74.3802 7.83008L76.1233 11.9043V12H73.9632L72.4661 8.36328ZM71.468 6.68848H72.6096C73.0107 6.68848 73.3115 6.55632 73.512 6.29199C73.7125 6.02311 73.8128 5.66536 73.8128 5.21875C73.8128 4.2207 73.4231 3.72168 72.6438 3.72168H71.468V6.68848Z"
          fill="url(#grad-text)"
        />
        <path
          d="M80.8563 6.51758L82.3533 2.04688H84.5408L81.8748 8.39062V12H79.8377V8.39062L77.1649 2.04688H79.3524L80.8563 6.51758Z"
          fill="url(#grad-text)"
        />
      </g>
    </svg>
  );
};

const LogoGrid = () => {
  return (
    <svg
      className="eg-logo__grid"
      viewBox="0 0 40 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient
          id="grad-led-full"
          gradientUnits="objectBoundingBox"
          gradientTransform="translate(-0.25 -0.3) scale(1.41421)"
        >
          <stop stopColor="var(--gd-full-s0)" />
          <stop offset="1" stopColor="var(--gd-full-s1)" />
        </radialGradient>

        <radialGradient id="grad-led-half" gradientUnits="objectBoundingBox">
          <stop stopColor="var(--gd-half-s0)" />
          <stop offset="1" stopColor="var(--gd-half-s1)" />
        </radialGradient>

        <radialGradient id="grad-led-off" gradientUnits="objectBoundingBox">
          <stop stopColor="var(--gd-off-s0)" />
          <stop offset="1" stopColor="var(--gd-off-s1)" />
        </radialGradient>
        <path id="led-off" d="M2 0H0V2H2V0Z" fill="url(#grad-led-off)" />
        <path id="led-half" d="M2 0H0V2H2V0Z" fill="url(#grad-led-half)" />
        <path id="led-full" d="M2 0H0V2H2V0Z" fill="url(#grad-led-full)" />
      </defs>

      <g id="off-leds">
        <use href="#led-off" x="0" y="0" />
        <use href="#led-off" x="0" y="2" />
        <use href="#led-off" x="0" y="4" />
        <use href="#led-off" x="0" y="6" />
        <use href="#led-off" x="0" y="8" />
        <use href="#led-off" x="0" y="10" />
        <use href="#led-off" x="0" y="12" />
        <use href="#led-off" x="2" y="0" />
        <use href="#led-off" x="2" y="12" />
        <use href="#led-off" x="4" y="0" />
        <use href="#led-off" x="4" y="12" />
        <use href="#led-off" x="4" y="4" />
        <use href="#led-off" x="4" y="6" />
        <use href="#led-off" x="4" y="8" />
        <use href="#led-off" x="6" y="0" />
        <use href="#led-off" x="6" y="12" />
        <use href="#led-off" x="6" y="4" />
        <use href="#led-off" x="6" y="8" />
        <use href="#led-off" x="8" y="0" />
        <use href="#led-off" x="8" y="12" />
        <use href="#led-off" x="8" y="4" />
        <use href="#led-off" x="10" y="0" />
        <use href="#led-off" x="10" y="10" />
        <use href="#led-off" x="10" y="12" />
        <use href="#led-off" x="10" y="2" />
        <use href="#led-off" x="10" y="4" />
        <use href="#led-off" x="10" y="6" />
        <use href="#led-off" x="10" y="8" />
        <use href="#led-off" x="12" y="0" />
        <use href="#led-off" x="12" y="12" />
        <use href="#led-off" x="14" y="0" />
        <use href="#led-off" x="14" y="10" />
        <use href="#led-off" x="14" y="12" />
        <use href="#led-off" x="14" y="4" />
        <use href="#led-off" x="14" y="8" />
        <use href="#led-off" x="16" y="0" />
        <use href="#led-off" x="16" y="10" />
        <use href="#led-off" x="16" y="12" />
        <use href="#led-off" x="16" y="4" />
        <use href="#led-off" x="16" y="8" />
        <use href="#led-off" x="18" y="0" />
        <use href="#led-off" x="18" y="12" />
        <use href="#led-off" x="20" y="0" />
        <use href="#led-off" x="20" y="10" />
        <use href="#led-off" x="20" y="12" />
        <use href="#led-off" x="20" y="2" />
        <use href="#led-off" x="20" y="4" />
        <use href="#led-off" x="20" y="6" />
        <use href="#led-off" x="20" y="8" />
        <use href="#led-off" x="22" y="0" />
        <use href="#led-off" x="22" y="12" />
        <use href="#led-off" x="24" y="0" />
        <use href="#led-off" x="24" y="10" />
        <use href="#led-off" x="24" y="12" />
        <use href="#led-off" x="24" y="2" />
        <use href="#led-off" x="24" y="4" />
        <use href="#led-off" x="24" y="6" />
        <use href="#led-off" x="24" y="8" />
        <use href="#led-off" x="26" y="0" />
        <use href="#led-off" x="26" y="12" />
        <use href="#led-off" x="28" y="0" />
        <use href="#led-off" x="28" y="12" />
        <use href="#led-off" x="28" y="4" />
        <use href="#led-off" x="28" y="6" />
        <use href="#led-off" x="28" y="8" />
        <use href="#led-off" x="30" y="0" />
        <use href="#led-off" x="30" y="12" />
        <use href="#led-off" x="30" y="4" />
        <use href="#led-off" x="30" y="6" />
        <use href="#led-off" x="30" y="8" />
        <use href="#led-off" x="32" y="0" />
        <use href="#led-off" x="32" y="12" />
        <use href="#led-off" x="34" y="0" />
        <use href="#led-off" x="34" y="2" />
        <use href="#led-off" x="34" y="4" />
        <use href="#led-off" x="34" y="6" />
        <use href="#led-off" x="34" y="8" />
        <use href="#led-off" x="34" y="10" />
        <use href="#led-off" x="34" y="12" />
      </g>
      <g id="half-leds">
        <use className="led-g" href="#led-half" x="2" y="2" />
        <use className="led-g" href="#led-half" x="2" y="10" />
        <use className="led-g" href="#led-half" x="8" y="10" />
        <use className="led-r" href="#led-half" x="18" y="2" />
        <use className="led-r" href="#led-half" x="18" y="6" />
        <use className="led-d" href="#led-half" x="32" y="2" />
        <use className="led-d" href="#led-half" x="32" y="10" />
      </g>
      <g id="full-leds">
        <use className="led-g" href="#led-full" x="2" y="4" />
        <use className="led-g" href="#led-full" x="2" y="6" />
        <use className="led-g" href="#led-full" x="2" y="8" />
        <use className="led-g" href="#led-full" x="4" y="2" />
        <use className="led-g" href="#led-full" x="4" y="10" />
        <use className="led-g" href="#led-full" x="6" y="2" />
        <use className="led-g" href="#led-full" x="6" y="6" />
        <use className="led-g" href="#led-full" x="6" y="10" />
        <use className="led-g" href="#led-full" x="8" y="2" />
        <use className="led-g" href="#led-full" x="8" y="6" />
        <use className="led-g" href="#led-full" x="8" y="8" />

        <use className="led-r" href="#led-full" x="12" y="2" />
        <use className="led-r" href="#led-full" x="12" y="4" />
        <use className="led-r" href="#led-full" x="12" y="6" />
        <use className="led-r" href="#led-full" x="12" y="8" />
        <use className="led-r" href="#led-full" x="12" y="10" />
        <use className="led-r" href="#led-full" x="14" y="2" />
        <use className="led-r" href="#led-full" x="14" y="6" />
        <use className="led-r" href="#led-full" x="16" y="2" />
        <use className="led-r" href="#led-full" x="16" y="6" />
        <use className="led-r" href="#led-full" x="18" y="4" />
        <use className="led-r" href="#led-full" x="18" y="8" />
        <use className="led-r" href="#led-full" x="18" y="10" />

        <use className="led-i" href="#led-full" x="22" y="2" />
        <use className="led-i" href="#led-full" x="22" y="4" />
        <use className="led-i" href="#led-full" x="22" y="6" />
        <use className="led-i" href="#led-full" x="22" y="8" />
        <use className="led-i" href="#led-full" x="22" y="10" />

        <use className="led-d" href="#led-full" x="26" y="2" />
        <use className="led-d" href="#led-full" x="26" y="4" />
        <use className="led-d" href="#led-full" x="26" y="6" />
        <use className="led-d" href="#led-full" x="26" y="8" />
        <use className="led-d" href="#led-full" x="26" y="10" />
        <use className="led-d" href="#led-full" x="28" y="10" />
        <use className="led-d" href="#led-full" x="28" y="2" />
        <use className="led-d" href="#led-full" x="30" y="2" />
        <use className="led-d" href="#led-full" x="30" y="10" />
        <use className="led-d" href="#led-full" x="32" y="4" />
        <use className="led-d" href="#led-full" x="32" y="6" />
        <use className="led-d" href="#led-full" x="32" y="8" />
      </g>
    </svg>
  );
};

export const Logo = memo(() => {
  const { meters } = useContext(PlaybackContext);
  useAnimationFrame(1000 / 30, "logo");

  const meter = (id: string, gain = 0.5) => clamp(meters[id] * gain) + 0.5;

  const calcStyle = () => {
    return {
      [`--meter-g`]: meter("synth:right", 6),
      [`--meter-r`]: meter("bass", 2),
      [`--meter-i`]: meter("kick"),
      [`--meter-d`]: meter("master:left"),
    } as CSSProperties;
  };

  return (
    <div className="eg-logo" style={calcStyle()}>
      <LogoTitle />
      <LogoGrid />
    </div>
  );
});
