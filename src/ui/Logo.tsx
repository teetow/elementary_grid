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

      <g id="text">
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
      viewBox="86 0 36 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <radialGradient
        id="led-full"
        gradientUnits="objectBoundingBox"
        gradientTransform="translate(-0.25 -0.3) scale(1.41421)"
      >
        <stop stopColor="var(--gd-full-s0)" />
        <stop offset="1" stopColor="var(--gd-full-s1)" />
      </radialGradient>

      <radialGradient id="led-half" gradientUnits="objectBoundingBox">
        <stop stopColor="var(--gd-half-s0)" />
        <stop offset="1" stopColor="var(--gd-half-s1)" />
      </radialGradient>

      <radialGradient id="led-off" gradientUnits="objectBoundingBox">
        <stop stopColor="var(--gd-off-s0)" />
        <stop offset="1" stopColor="var(--gd-off-s1)" />
      </radialGradient>

      <g id="off-leds">
        <path d="M88 0H86V2H88V0Z" fill="url(#led-off)" />
        <path d="M88 10H86V12H88V10Z" fill="url(#led-off)" />
        <path d="M88 2H86V4H88V2Z" fill="url(#led-off)" />
        <path d="M88 4H86V6H88V4Z" fill="url(#led-off)" />
        <path d="M88 6H86V8H88V6Z" fill="url(#led-off)" />
        <path d="M88 8H86V10H88V8Z" fill="url(#led-off)" />
        <path d="M90 0H88V2H90V0Z" fill="url(#led-off)" />
        <path d="M90 12H88V14H90V12Z" fill="url(#led-off)" />
        <path d="M92 0H90V2H92V0Z" fill="url(#led-off)" />
        <path d="M92 12H90V14H92V12Z" fill="url(#led-off)" />
        <path d="M92 4H90V6H92V4Z" fill="url(#led-off)" />
        <path d="M92 6H90V8H92V6Z" fill="url(#led-off)" />
        <path d="M92 8H90V10H92V8Z" fill="url(#led-off)" />
        <path d="M94 0H92V2H94V0Z" fill="url(#led-off)" />
        <path d="M94 12H92V14H94V12Z" fill="url(#led-off)" />
        <path d="M94 4H92V6H94V4Z" fill="url(#led-off)" />
        <path d="M94 8H92V10H94V8Z" fill="url(#led-off)" />
        <path d="M96 0H94V2H96V0Z" fill="url(#led-off)" />
        <path d="M96 12H94V14H96V12Z" fill="url(#led-off)" />
        <path d="M96 4H94V6H96V4Z" fill="url(#led-off)" />
        <path d="M98 0H96V2H98V0Z" fill="url(#led-off)" />
        <path d="M98 10H96V12H98V10Z" fill="url(#led-off)" />
        <path d="M98 12H96V14H98V12Z" fill="url(#led-off)" />
        <path d="M98 2H96V4H98V2Z" fill="url(#led-off)" />
        <path d="M98 4H96V6H98V4Z" fill="url(#led-off)" />
        <path d="M98 6H96V8H98V6Z" fill="url(#led-off)" />
        <path d="M98 8H96V10H98V8Z" fill="url(#led-off)" />
        <path d="M100 0H98V2H100V0Z" fill="url(#led-off)" />
        <path d="M100 12H98V14H100V12Z" fill="url(#led-off)" />
        <path d="M102 0H100V2H102V0Z" fill="url(#led-off)" />
        <path d="M102 10H100V12H102V10Z" fill="url(#led-off)" />
        <path d="M102 12H100V14H102V12Z" fill="url(#led-off)" />
        <path d="M102 4H100V6H102V4Z" fill="url(#led-off)" />
        <path d="M102 8H100V10H102V8Z" fill="url(#led-off)" />
        <path d="M104 0H102V2H104V0Z" fill="url(#led-off)" />
        <path d="M104 10H102V12H104V10Z" fill="url(#led-off)" />
        <path d="M104 12H102V14H104V12Z" fill="url(#led-off)" />
        <path d="M104 4H102V6H104V4Z" fill="url(#led-off)" />
        <path d="M104 8H102V10H104V8Z" fill="url(#led-off)" />
        <path d="M106 0H104V2H106V0Z" fill="url(#led-off)" />
        <path d="M106 12H104V14H106V12Z" fill="url(#led-off)" />
        <path d="M108 0H106V2H108V0Z" fill="url(#led-off)" />
        <path d="M108 10H106V12H108V10Z" fill="url(#led-off)" />
        <path d="M108 12H106V14H108V12Z" fill="url(#led-off)" />
        <path d="M108 2H106V4H108V2Z" fill="url(#led-off)" />
        <path d="M108 4H106V6H108V4Z" fill="url(#led-off)" />
        <path d="M108 6H106V8H108V6Z" fill="url(#led-off)" />
        <path d="M108 8H106V10H108V8Z" fill="url(#led-off)" />
        <path d="M110 0H108V2H110V0Z" fill="url(#led-off)" />
        <path d="M110 12H108V14H110V12Z" fill="url(#led-off)" />
        <path d="M112 0H110V2H112V0Z" fill="url(#led-off)" />
        <path d="M112 10H110V12H112V10Z" fill="url(#led-off)" />
        <path d="M112 12H110V14H112V12Z" fill="url(#led-off)" />
        <path d="M112 2H110V4H112V2Z" fill="url(#led-off)" />
        <path d="M112 4H110V6H112V4Z" fill="url(#led-off)" />
        <path d="M112 6H110V8H112V6Z" fill="url(#led-off)" />
        <path d="M112 8H110V10H112V8Z" fill="url(#led-off)" />
        <path d="M114 0H112V2H114V0Z" fill="url(#led-off)" />
        <path d="M114 12H112V14H114V12Z" fill="url(#led-off)" />
        <path d="M116 0H114V2H116V0Z" fill="url(#led-off)" />
        <path d="M116 12H114V14H116V12Z" fill="url(#led-off)" />
        <path d="M116 4H114V6H116V4Z" fill="url(#led-off)" />
        <path d="M116 6H114V8H116V6Z" fill="url(#led-off)" />
        <path d="M116 8H114V10H116V8Z" fill="url(#led-off)" />
        <path d="M118 0H116V2H118V0Z" fill="url(#led-off)" />
        <path d="M118 12H116V14H118V12Z" fill="url(#led-off)" />
        <path d="M118 4H116V6H118V4Z" fill="url(#led-off)" />
        <path d="M118 6H116V8H118V6Z" fill="url(#led-off)" />
        <path d="M118 8H116V10H118V8Z" fill="url(#led-off)" />
        <path d="M120 0H118V2H120V0Z" fill="url(#led-off)" />
        <path d="M120 12H118V14H120V12Z" fill="url(#led-off)" />
        <path d="M122 0H120V2H122V0Z" fill="url(#led-off)" />
        <path d="M122 10H120V12H122V10Z" fill="url(#led-off)" />
        <path d="M122 12H120V14H122V12Z" fill="url(#led-off)" />
        <path d="M122 2H120V4H122V2Z" fill="url(#led-off)" />
        <path d="M122 4H120V6H122V4Z" fill="url(#led-off)" />
        <path d="M122 6H120V8H122V6Z" fill="url(#led-off)" />
        <path d="M122 8H120V10H122V8Z" fill="url(#led-off)" />
      </g>
      <g id="half-leds">
        <path d="M106 2H104V4H106V2Z" fill="url(#led-half)" />
        <path d="M90 2H88V4H90V2Z" fill="url(#led-half)" />
        <path d="M90 10H88V12H90V10Z" fill="url(#led-half)" />
        <path d="M96 10H94V12H96V10Z" fill="url(#led-half)" />
        <path d="M120 10H118V12H120V10Z" fill="url(#led-half)" />
        <path d="M120 2H118V4H120V2Z" fill="url(#led-half)" />
        <path d="M106 6H104V8H106V6Z" fill="url(#led-half)" />
      </g>
      <g id="full-leds">
        <path d="M92 2H90V4H92V2Z" fill="url(#led-full)" />
        <path d="M94 2H92V4H94V2Z" fill="url(#led-full)" />
        <path d="M96 2H94V4H96V2Z" fill="url(#led-full)" />
        <path d="M100 2H98V4H100V2Z" fill="url(#led-full)" />
        <path d="M114 2H112V4H114V2Z" fill="url(#led-full)" />
        <path d="M110 2H108V4H110V2Z" fill="url(#led-full)" />
        <path d="M102 2H100V4H102V2Z" fill="url(#led-full)" />
        <path d="M116 2H114V4H116V2Z" fill="url(#led-full)" />
        <path d="M104 2H102V4H104V2Z" fill="url(#led-full)" />
        <path d="M118 2H116V4H118V2Z" fill="url(#led-full)" />
        <path d="M106 4H104V6H106V4Z" fill="url(#led-full)" />
        <path d="M120 4H118V6H120V4Z" fill="url(#led-full)" />
        <path d="M102 6H100V8H102V6Z" fill="url(#led-full)" />
        <path d="M116 10H114V12H116V10Z" fill="url(#led-full)" />
        <path d="M104 6H102V8H104V6Z" fill="url(#led-full)" />
        <path d="M118 10H116V12H118V10Z" fill="url(#led-full)" />
        <path d="M106 8H104V10H106V8Z" fill="url(#led-full)" />
        <path d="M120 6H118V8H120V6Z" fill="url(#led-full)" />
        <path d="M106 10H104V12H106V10Z" fill="url(#led-full)" />
        <path d="M120 8H118V10H120V8Z" fill="url(#led-full)" />
        <path d="M100 4H98V6H100V4Z" fill="url(#led-full)" />
        <path d="M114 4H112V6H114V4Z" fill="url(#led-full)" />
        <path d="M110 4H108V6H110V4Z" fill="url(#led-full)" />
        <path d="M100 6H98V8H100V6Z" fill="url(#led-full)" />
        <path d="M114 6H112V8H114V6Z" fill="url(#led-full)" />
        <path d="M110 6H108V8H110V6Z" fill="url(#led-full)" />
        <path d="M100 8H98V10H100V8Z" fill="url(#led-full)" />
        <path d="M114 8H112V10H114V8Z" fill="url(#led-full)" />
        <path d="M110 8H108V10H110V8Z" fill="url(#led-full)" />
        <path d="M100 10H98V12H100V10Z" fill="url(#led-full)" />
        <path d="M114 10H112V12H114V10Z" fill="url(#led-full)" />
        <path d="M110 10H108V12H110V10Z" fill="url(#led-full)" />
        <path d="M90 4H88V6H90V4Z" fill="url(#led-full)" />
        <path d="M90 6H88V8H90V6Z" fill="url(#led-full)" />
        <path d="M94 6H92V8H94V6Z" fill="url(#led-full)" />
        <path d="M96 8H94V10H96V8Z" fill="url(#led-full)" />
        <path d="M96 6H94V8H96V6Z" fill="url(#led-full)" />
        <path d="M94 10H92V12H94V10Z" fill="url(#led-full)" />
        <path d="M92 10H90V12H92V10Z" fill="url(#led-full)" />
        <path d="M90 8H88V10H90V8Z" fill="url(#led-full)" />
      </g>
    </svg>
  );
};
export const Logo = () => {
  return (
    <div className="eg-logo">
      <LogoTitle />
      <LogoGrid />
    </div>
  );
};
