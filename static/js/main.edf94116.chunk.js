(this.webpackJsonpelementary_grid=this.webpackJsonpelementary_grid||[]).push([[0],{34:function(e,t,l){},36:function(e,t,l){},37:function(e,t,l){},38:function(e,t,l){},39:function(e,t,l){},40:function(e,t,l){},41:function(e,t,l){"use strict";l.r(t);var r=l(9),a=l.n(r),c=l(16),s=l(1),n=l(4),i=l.n(n),f=l(23),d=l.n(f),o=l(13),u=l(2),j=l(3),b=s.a,h=l(25),H=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:16,l=1/(e/60);return 4*l/t*1e3},V=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.length,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:4,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=x(t).map((function(t){return"".concat(e[t%e.length]).concat(Math.floor((t-r)/e.length)+l)}));return a.flat().map(p).map(O)},p=function(e){var t=["c","c#","d","d#","e","f","f#","g","g#","a","a#","b"],l=e.match(Object(h.a)(/([0-9A-Z_a-z]?#?)([0-9])/,{name:1,octave:2})),r=Object(u.a)(l,3),a=(r[0],r[1]),c=r[2];return t.indexOf(a)<0?-1:12*Number(c)+t.indexOf(a)},O=function(e){return e<0?0:440*Math.pow(2,(e-69)/12)},x=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return Object(o.a)(Array.from(Array(e).keys()).map((function(e){return e+t})))},g=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return Math.max(Math.min(e,l),t)},M=function(e){return e.reduce((function(e,t,l){return e|t<<l}))},m=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:16;return x(t).map((function(t){var l=1<<t;return(e&l)===l?1:0}))},Z=function(e,t){switch(t.type){case"setTracks":return Object(j.a)(Object(j.a)({},e),{},{tracks:t.tracks});case"setBassTracks":return Object(j.a)(Object(j.a)({},e),{},{bassTracks:t.tracks});case"setTone":return Object(j.a)(Object(j.a)({},e),{},{tone:t.tone});case"setUseKick":return Object(j.a)(Object(j.a)({},e),{},{useKick:t.useKick});default:throw new Error("Tried to perform ".concat(t,", which is not a valid action"))}},v=l(19),k=l(24),y=l.n(k),w=(l(34),l(0)),C=Object(n.memo)((function(e){var t=e.hasHilight,l=e.note,r=e.state,a=e.step,c=e.onDrawStart,s=e.onDrawEnter,i=Object(n.useCallback)((function(){return c(l,a)}),[l,c,a]),f=Object(n.useCallback)((function(){return s(l,a)}),[l,s,a]),d=y()({"eg-key":!0,"eg-key--is-active":r,"eg-key--has-hilight":t}),o={"--step":a,"--note":l};return Object(w.jsx)("div",{className:d,style:o,onMouseEnter:f,onMouseDown:i})})),_=function(e){var t=e.notes,l=e.onToggleNote,r=Object(n.useState)("none"),a=Object(u.a)(r,2),c=a[0],s=a[1],i=Object(n.useCallback)((function(){return s("none")}),[]);Object(n.useEffect)((function(){return document.addEventListener("mouseup",i),function(){document.removeEventListener("mouseup",i)}}),[i]);var f=Object(n.useCallback)((function(e,r){0===t[e][r]?(l(e,r,1),s("fill")):(l(e,r,0),s("clear"))}),[t,l]),d=Object(n.useCallback)((function(e,r){"fill"===c&&0===t[e][r]&&l(e,r,1),"clear"===c&&1===t[e][r]&&l(e,r,0)}),[t,l,c]);return Object(w.jsx)(w.Fragment,{children:x(t.length).map((function(e){return x(t[0].length).map((function(l){var r=1===t[e][l],a="".concat(e,"_").concat(l,"_").concat(r?"on":"off");return Object(w.jsx)(C,{note:e,state:r,step:l,onDrawStart:f,onDrawEnter:d},a)}))}))})},T=function(e){var t=e.notes,l=e.color,r=void 0===l?"yellow":l,a=e.hilightStep,c=e.onToggleNote,s=y()(Object(v.a)({"eg-grid":!0},"eg-grid--color-".concat(r),void 0!==r)),n={"--columns":t[0].length,"--rows":t.length},i={"--cursor":a};return Object(w.jsxs)("div",{className:s,style:n,children:[Object(w.jsx)(_,{notes:t,onToggleNote:c}),Object(w.jsx)("div",{className:"eg-grid__cursor",style:i})]})},N=(l(36),function(){return Object(w.jsxs)("div",{className:"eg-splainer",children:[Object(w.jsxs)("span",{children:["Made with ",Object(w.jsx)("a",{href:"https://www.elementary.audio/",children:"Elementary Audio"})]}),Object(w.jsxs)("span",{children:["Source on ",Object(w.jsx)("a",{href:"https://github.com/teetow/elementary_grid",children:"GitHub"})]}),Object(w.jsxs)("span",{children:["Check out my ",Object(w.jsx)("a",{href:"https://soundcloud.com/teetow",children:"SoundCloud"})," =)"]})]})}),S=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},l=t.gain,r=void 0===l?1:l,a=t.detune,c=void 0===a?.004:a,n=t.sharpness,i=void 0===n?1:n,f=t.richness,d=void 0===f?1:f,o=function(e,t){return s.b.mul(t,s.b.add(s.b.sin(s.b.mul(2*Math.PI,e)),s.b.sin(s.b.mul(3*Math.PI,e,.08*i))))},u=s.b.add(o(s.b.phasor(e*(1-c)),.5*d),o(s.b.phasor(1*e),.8),o(s.b.phasor(e*(1+c)),.5*d));return s.b.mul(r,u)};S.desc="Not quite a supersaw, but certainly a stabby little rascal";var L=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},l=t.gain,r=void 0===l?1:l,a=t.richness,c=void 0===a?.1:a,n=t.detune,i=void 0===n?.003:n,f=s.b.add(s.b.mul(.8*c,s.b.cycle(1*e*(1-i))),s.b.cycle(e),s.b.mul(.8*c,s.b.cycle(1*e*(1+i))),s.b.mul(.5*c,s.b.cycle(2*e*(1-.5*i))),s.b.mul(.5*c,s.b.cycle(2*e*(1+.5*i))));return f=s.b.mul(f,3*r),f=s.b.tanh(f),f=s.b.highpass(100,.7,f),f=s.b.mul(f,.8*r)};L.desc="Pseudo-FM bell-like patch with a sprinkle of unpredictability";var A=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},l=t.gain,r=void 0===l?1:l,a=t.richness,c=void 0===a?1:a,n=s.b.mul(s.b.blepsaw(e),.9),i=s.b.add(s.b.mul(.5*c,s.b.cycle(s.b.mul(e,2.02))),s.b.mul(.5*c,s.b.cycle(s.b.mul(e,2.98))));return n=s.b.add(n,i),n=s.b.highpass(s.b.mul(1,e),5,n),n=s.b.min(2,n),n=s.b.lowpass(s.b.mul(4,e),.8,n),n=s.b.mul(.5*r,n)};A.desc="BASS";var B=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},l=t.freq,r=void 0===l?42:l,a=t.speed,c=void 0===a?1:a,n=t.pop,i=void 0===n?1:n,f=t.tail,d=void 0===f?1:f,o=s.b.adsr(1e-4,.2*c,0,0,e),u=s.b.adsr(1e-4,.5,0,0,e),j=s.b.add(1,s.b.mul(3*i,o));j=s.b.add(0,s.b.mul(.5*i,u),j);var b=s.b.cycle(s.b.mul(j,r)),h=s.b.adsr(.03,.23*c,0,0,e);b=s.b.tanh(s.b.mul(1,h,b));var H=s.b.adsr(.001,.01,0,0,e),V=s.b.cycle(s.b.mul(H,3e3)),p=s.b.adsr(.005,.1,0,0,e);return V=s.b.lowpass(s.b.add(110,s.b.mul(1200,p)),1,V),b=s.b.add(s.b.mul(.4,V),b),b=s.b.highpass(r+14,5*d,b),b=s.b.tanh(b)},E={stab:S,ding:L,bass:A,kick:B},K=function(e){var t=e.tracks,l=e.tone,r=e.scale,a=e.tick,c=e.sync,n=function(e){return s.b.adsr(.02,.3,.1,.9,function(e){return s.b.seq({key:"synth:".concat(e,":seq"),seq:t[e],loop:!1},a.current,c.current)}(e))},i=function(e){return t=r[e],E[l](t,{gain:.8});var t},f=function(e){return s.b.mul(n(e),i(e))};return x(r.length).reduce((function(e,t){return 0===e?s.b.add(f(e),f(t)):s.b.add(e,f(t))}))},q=function(e){var t=e.tracks,l=e.bassTracks,r=e.scale,a=e.bassScale,c=e.withKick,i=void 0===c||c,f=e.bpm,d=void 0===f?120:f,o=e.tone,u=void 0===o?"ding":o,j=Object(n.useRef)(s.b.metro({name:"tick",interval:H(d,16)})),b=Object(n.useRef)(s.b.metro({name:"beat",interval:H(d,4)})),h=Object(n.useRef)(s.b.metro({name:"sync",interval:H(d,1)})),V=Object(n.useCallback)((function(){try{var e=K({tracks:t,tone:u,part:"synth",scale:r,tick:j,sync:h});e=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:120,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=s.b.delay({size:1e3},s.b.ms2samps(3*H(t,16)),-.3,e);return s.b.add(s.b.mul(e,g(2-l)),s.b.mul(r,l,.5))}(e,d,1),e=s.b.tanh(s.b.mul(.4,e));var c=function(e){var t=e.tracks,l=e.scale,r=e.tick,a=e.sync,c=e.legato,n=void 0!==c&&c,i=t[0].length,f=Array(i).fill(0),d=Array(i).fill(0);t.forEach((function(e,t){return e.forEach((function(e,r){1===e&&(f[r]=1,d[r]=l[t])}))})),d=d.filter((function(e){return e>0}));var o=s.b.seq({seq:f,hold:n,loop:!1},r.current,a.current),u=s.b.adsr(.03,.4,.6,.3,o),j=s.b.seq({key:"bass:freq",seq:d,hold:!0,loop:!1},o,a.current),b=E.bass(j,{gain:.8});return s.b.mul(u,b)}({tracks:l,scale:a,tick:j,sync:h});e=s.b.add(e,s.b.mul(.8,c),0),e=function(e,t,l,r){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:1,c=s.b.mul(1*a,s.b.add(s.b.mul(0,t.current),s.b.mul(0,l.current),s.b.mul(0,r.current),e));return s.b.highpass(70,.7,c)}(e=s.b.add(e,s.b.mul(i?1:0,B(b.current,{pop:1.2}))),j,b,h,.6),s.a.render(e,e)}catch(n){console.log(n)}}),[t,u,r,d,l,a,i]);Object(n.useEffect)((function(){s.a.__renderer&&V()}),[t,u,r,d,i,V])},U=(l(37),function(){return Object(w.jsxs)("svg",{className:"eg-logo__text",viewBox:"-4 2 94 10",xmlns:"http://www.w3.org/2000/svg",children:[Object(w.jsxs)("radialGradient",{id:"grad-text",cx:"0",cy:"0",r:"1",gradientUnits:"userSpaceOnUse",gradientTransform:"translate(20 0) rotate(10.5392) scale(42.4514 15.2674)",children:[Object(w.jsx)("stop",{stopColor:"var(--gd-text-s0)"}),Object(w.jsx)("stop",{offset:"1",stopColor:"var(--gd-text-s1)"})]}),Object(w.jsxs)("g",{id:"text",children:[Object(w.jsx)("path",{d:"M5.28333 7.69336H2.15247V10.332H5.85754V12H0.1427V2.04688H5.84387V3.72168H2.15247V6.07324H5.28333V7.69336Z",fill:"url(#grad-text)"}),Object(w.jsx)("path",{d:"M10.0094 10.332H13.5368V12H7.99965V2.04688H10.0094V10.332Z",fill:"url(#grad-text)"}),Object(w.jsx)("path",{d:"M20.8195 7.69336H17.6886V10.332H21.3937V12H15.6789V2.04688H21.38V3.72168H17.6886V6.07324H20.8195V7.69336Z",fill:"url(#grad-text)"}),Object(w.jsx)("path",{d:"M26.1608 2.04688L28.0407 9.24512L29.9138 2.04688H32.5388V12H30.5222V9.30664L30.7067 5.15723L28.7175 12H27.3503L25.361 5.15723L25.5456 9.30664V12H23.5358V2.04688H26.1608Z",fill:"url(#grad-text)"}),Object(w.jsx)("path",{d:"M40.2795 7.69336H37.1486V10.332H40.8537V12H35.1389V2.04688H40.84V3.72168H37.1486V6.07324H40.2795V7.69336Z",fill:"url(#grad-text)"}),Object(w.jsx)("path",{d:"M49.9548 12H47.945L45.0056 5.47168V12H42.9958V2.04688H45.0056L47.9519 8.58203V2.04688H49.9548V12Z",fill:"url(#grad-text)"}),Object(w.jsx)("path",{d:"M58.7893 3.72168H56.3284V12H54.3118V3.72168H51.8918V2.04688H58.7893V3.72168Z",fill:"url(#grad-text)"}),Object(w.jsx)("path",{d:"M64.8552 9.96289H62.114L61.5808 12H59.4548L62.5652 2.04688H64.4041L67.5349 12H65.3884L64.8552 9.96289ZM62.5515 8.28809H64.4109L63.4812 4.74023L62.5515 8.28809Z",fill:"url(#grad-text)"}),Object(w.jsx)("path",{d:"M72.4661 8.36328H71.468V12H69.4583V2.04688H72.6643C73.6715 2.04688 74.4485 2.30892 74.9954 2.83301C75.5468 3.35254 75.8225 4.0931 75.8225 5.05469C75.8225 6.3763 75.3417 7.30143 74.3802 7.83008L76.1233 11.9043V12H73.9632L72.4661 8.36328ZM71.468 6.68848H72.6096C73.0107 6.68848 73.3115 6.55632 73.512 6.29199C73.7125 6.02311 73.8128 5.66536 73.8128 5.21875C73.8128 4.2207 73.4231 3.72168 72.6438 3.72168H71.468V6.68848Z",fill:"url(#grad-text)"}),Object(w.jsx)("path",{d:"M80.8563 6.51758L82.3533 2.04688H84.5408L81.8748 8.39062V12H79.8377V8.39062L77.1649 2.04688H79.3524L80.8563 6.51758Z",fill:"url(#grad-text)"})]})]})}),G=function(){return Object(w.jsxs)("svg",{className:"eg-logo__grid",viewBox:"86 0 36 14",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[Object(w.jsxs)("radialGradient",{id:"led-full",gradientUnits:"objectBoundingBox",gradientTransform:"translate(-0.25 -0.3) scale(1.41421)",children:[Object(w.jsx)("stop",{stopColor:"var(--gd-full-s0)"}),Object(w.jsx)("stop",{offset:"1",stopColor:"var(--gd-full-s1)"})]}),Object(w.jsxs)("radialGradient",{id:"led-half",gradientUnits:"objectBoundingBox",children:[Object(w.jsx)("stop",{stopColor:"var(--gd-half-s0)"}),Object(w.jsx)("stop",{offset:"1",stopColor:"var(--gd-half-s1)"})]}),Object(w.jsxs)("radialGradient",{id:"led-off",gradientUnits:"objectBoundingBox",children:[Object(w.jsx)("stop",{stopColor:"var(--gd-off-s0)"}),Object(w.jsx)("stop",{offset:"1",stopColor:"var(--gd-off-s1)"})]}),Object(w.jsxs)("g",{id:"off-leds",children:[Object(w.jsx)("path",{d:"M88 0H86V2H88V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M88 10H86V12H88V10Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M88 2H86V4H88V2Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M88 4H86V6H88V4Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M88 6H86V8H88V6Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M88 8H86V10H88V8Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M90 0H88V2H90V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M90 12H88V14H90V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M92 0H90V2H92V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M92 12H90V14H92V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M92 4H90V6H92V4Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M92 6H90V8H92V6Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M92 8H90V10H92V8Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M94 0H92V2H94V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M94 12H92V14H94V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M94 4H92V6H94V4Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M94 8H92V10H94V8Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M96 0H94V2H96V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M96 12H94V14H96V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M96 4H94V6H96V4Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M98 0H96V2H98V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M98 10H96V12H98V10Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M98 12H96V14H98V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M98 2H96V4H98V2Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M98 4H96V6H98V4Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M98 6H96V8H98V6Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M98 8H96V10H98V8Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M100 0H98V2H100V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M100 12H98V14H100V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M102 0H100V2H102V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M102 10H100V12H102V10Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M102 12H100V14H102V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M102 4H100V6H102V4Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M102 8H100V10H102V8Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M104 0H102V2H104V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M104 10H102V12H104V10Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M104 12H102V14H104V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M104 4H102V6H104V4Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M104 8H102V10H104V8Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M106 0H104V2H106V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M106 12H104V14H106V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M108 0H106V2H108V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M108 10H106V12H108V10Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M108 12H106V14H108V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M108 2H106V4H108V2Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M108 4H106V6H108V4Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M108 6H106V8H108V6Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M108 8H106V10H108V8Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M110 0H108V2H110V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M110 12H108V14H110V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M112 0H110V2H112V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M112 10H110V12H112V10Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M112 12H110V14H112V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M112 2H110V4H112V2Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M112 4H110V6H112V4Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M112 6H110V8H112V6Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M112 8H110V10H112V8Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M114 0H112V2H114V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M114 12H112V14H114V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M116 0H114V2H116V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M116 12H114V14H116V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M116 4H114V6H116V4Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M116 6H114V8H116V6Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M116 8H114V10H116V8Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M118 0H116V2H118V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M118 12H116V14H118V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M118 4H116V6H118V4Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M118 6H116V8H118V6Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M118 8H116V10H118V8Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M120 0H118V2H120V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M120 12H118V14H120V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M122 0H120V2H122V0Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M122 10H120V12H122V10Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M122 12H120V14H122V12Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M122 2H120V4H122V2Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M122 4H120V6H122V4Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M122 6H120V8H122V6Z",fill:"url(#led-off)"}),Object(w.jsx)("path",{d:"M122 8H120V10H122V8Z",fill:"url(#led-off)"})]}),Object(w.jsxs)("g",{id:"half-leds",children:[Object(w.jsx)("path",{d:"M106 2H104V4H106V2Z",fill:"url(#led-half)"}),Object(w.jsx)("path",{d:"M90 2H88V4H90V2Z",fill:"url(#led-half)"}),Object(w.jsx)("path",{d:"M90 10H88V12H90V10Z",fill:"url(#led-half)"}),Object(w.jsx)("path",{d:"M96 10H94V12H96V10Z",fill:"url(#led-half)"}),Object(w.jsx)("path",{d:"M120 10H118V12H120V10Z",fill:"url(#led-half)"}),Object(w.jsx)("path",{d:"M120 2H118V4H120V2Z",fill:"url(#led-half)"}),Object(w.jsx)("path",{d:"M106 6H104V8H106V6Z",fill:"url(#led-half)"})]}),Object(w.jsxs)("g",{id:"full-leds",children:[Object(w.jsx)("path",{d:"M92 2H90V4H92V2Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M94 2H92V4H94V2Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M96 2H94V4H96V2Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M100 2H98V4H100V2Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M114 2H112V4H114V2Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M110 2H108V4H110V2Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M102 2H100V4H102V2Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M116 2H114V4H116V2Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M104 2H102V4H104V2Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M118 2H116V4H118V2Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M106 4H104V6H106V4Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M120 4H118V6H120V4Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M102 6H100V8H102V6Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M116 10H114V12H116V10Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M104 6H102V8H104V6Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M118 10H116V12H118V10Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M106 8H104V10H106V8Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M120 6H118V8H120V6Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M106 10H104V12H106V10Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M120 8H118V10H120V8Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M100 4H98V6H100V4Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M114 4H112V6H114V4Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M110 4H108V6H110V4Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M100 6H98V8H100V6Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M114 6H112V8H114V6Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M110 6H108V8H110V6Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M100 8H98V10H100V8Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M114 8H112V10H114V8Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M110 8H108V10H110V8Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M100 10H98V12H100V10Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M114 10H112V12H114V10Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M110 10H108V12H110V10Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M90 4H88V6H90V4Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M90 6H88V8H90V6Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M94 6H92V8H94V6Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M96 8H94V10H96V8Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M96 6H94V8H96V6Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M94 10H92V12H94V10Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M92 10H90V12H92V10Z",fill:"url(#led-full)"}),Object(w.jsx)("path",{d:"M90 8H88V10H90V8Z",fill:"url(#led-full)"})]})]})},D=function(){return Object(w.jsxs)("div",{className:"eg-logo",children:[Object(w.jsx)(U,{}),Object(w.jsx)(G,{})]})},I=(l(38),function(e){var t=e.active,l=e.setActive;return Object(w.jsxs)("div",{className:"eg-synth__option eg-synth__kick-switch",children:[Object(w.jsx)("input",{className:"eg-synth__switch",type:"checkbox",id:"kick",checked:t,onChange:function(){return l(!t)}}),Object(w.jsx)("label",{htmlFor:"kick",children:"Kick"})]})}),R=[{name:"stab",label:"Stab"},{name:"ding",label:"Ding"}],F=function(e){var t=e.currentTone,l=e.onSetTone;return Object(w.jsx)("div",{className:"eg-synth__tone-picker",children:R.map((function(e){return Object(w.jsxs)("div",{className:"eg-synth__option",children:[Object(w.jsx)("input",{type:"radio",className:"eg-synth__led",id:e.name,value:e.name,checked:e.name===t,onChange:function(){return l(e.name)}}),Object(w.jsx)("label",{htmlFor:e.name,children:e.label})]},e.name)}))})};var P=function(e){var t=e.patch,l=e.scale,r=e.bassScale,a=e.onClear,c=e.onSetKick,s=e.onSetTone;return q({scale:l,bassScale:r,tone:t.tone,tracks:t.tracks,bassTracks:t.bassTracks,withKick:t.useKick}),Object(w.jsxs)("div",{className:"eg-synthoptions",children:[Object(w.jsx)(D,{}),Object(w.jsx)("button",{type:"button",className:"eg-button eg-synth__clearbutton",onClick:a,children:"Clear"}),Object(w.jsx)(F,{currentTone:t.tone,onSetTone:s}),Object(w.jsx)(I,{active:t.useKick,setActive:c})]})},z=(l(39),V(["c","d","f","g","a"],16)),J=V(["c","d","f","g","a","a#"],7,2),Q=function(e){};b.on("load",(function(){b.on("metro",(function(e){Q(e.source)})),b.on("error",(function(e){console.log(e)}))}));var W=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:16;return Array.from(Array(e),(function(){return new Array(16).fill(0)}))},X=function(){return Object(j.a)({tracks:W(),bassTracks:W(7),tone:"stab",useKick:!1},function(){var e={},t=new window.URLSearchParams(window.location.search);try{var l=t.getAll("tracks");l.length>0&&(e.tracks=l[0].split(",").map((function(e){return m(Number(e))})));var r=t.getAll("bassTracks");r.length>0&&(e.bassTracks=r[0].split(",").map((function(e){return m(Number(e))})));var a=t.getAll("kick");a.length>0&&(e.useKick=Boolean(Number(a[0])));var c=t.getAll("tone");return c.length>0&&(e.tone=c[0]),e}catch(s){console.log("Recall failed:",s)}}())},Y=function(){var e=Object(n.useReducer)(Z,X()),t=Object(u.a)(e,2),l=t[0],r=t[1],a=Object(n.useState)(0),c=Object(u.a)(a,2),s=c[0],i=c[1],f=Object(n.useCallback)((function(e,t,a){var c=Object(o.a)(l.tracks);c[e][t]=a,r({type:"setTracks",tracks:c})}),[l.tracks]),d=Object(n.useCallback)((function(e,t,a){var c=Object(o.a)(l.bassTracks);x(c.length).forEach((function(e){c[e][t]=0})),c[e][t]=a,r({type:"setBassTracks",tracks:c})}),[l.bassTracks]);Object(n.useEffect)((function(){!function(e){var t="?";t+="tracks="+e.tracks.map(M),t+="&kick="+(e.useKick?1:0),t+="&tone="+e.tone,t+="&bassTracks="+e.bassTracks.map(M),globalThis.history.replaceState(null,"",t)}(l)}),[l]);var j=Object(n.useCallback)((function(e){"sync"===e?i(0):"tick"===e&&i((function(e){return(e+1)%l.tracks.length}))}),[l.tracks]);return Q=j,Object(w.jsxs)("div",{className:"eg-app",children:[Object(w.jsx)(P,{scale:z,bassScale:J,patch:l,onClear:function(){r({type:"setTracks",tracks:W()}),r({type:"setBassTracks",tracks:W(7)})},onSetKick:function(e){return r({type:"setUseKick",useKick:e})},onSetTone:function(e){return r({type:"setTone",tone:e})}}),Object(w.jsx)(T,{notes:l.tracks,onToggleNote:f,hilightStep:s}),Object(w.jsx)(T,{notes:l.bassTracks,onToggleNote:d,hilightStep:s,color:"blue"}),Object(w.jsx)(N,{})]})};var $="a2,a3,--,a3".split(",").map((function(e){return e.trim()})).filter((function(e){return e.length>=2})).map((function(e){return"--"!==e?p(e):0})).map((function(e){return e>0?O(e):0}));console.log($);l(40);var ee=function(){return Object(w.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"eg-splash__playbutton",viewBox:"0 0 24 24",fill:"none",width:"24",height:"24",children:[Object(w.jsx)("defs",{children:Object(w.jsxs)("radialGradient",{id:"grad",cx:"0",cy:"0",r:"1",gradientUnits:"userSpaceOnUse",gradientTransform:"translate(11 12) rotate(45) scale(7)",children:[Object(w.jsx)("stop",{stopColor:"var(--color-grad-s1)"}),Object(w.jsx)("stop",{offset:"1",stopColor:"var(--color-grad-s0)"})]})}),Object(w.jsxs)("filter",{id:"dropshadow",x:"-100%",y:"-100%",height:"400%",width:"400%",children:[Object(w.jsx)("feComponentTransfer",{in:"SourceAlpha",result:"alpha",children:Object(w.jsx)("feFuncA",{type:"linear",slope:"0.4"})}),Object(w.jsx)("feColorMatrix",{in:"alpha",type:"matrix",values:" 1 0 0 0 1 0 1 0 0 0.5 0 0 1 0 0.2 0 0 0 1 0 ",result:"mask"}),Object(w.jsx)("feGaussianBlur",{in:"mask",stdDeviation:3.3}),Object(w.jsxs)("feMerge",{children:[Object(w.jsx)("feMergeNode",{}),Object(w.jsx)("feMergeNode",{in:"SourceGraphic"})]})]}),Object(w.jsx)("path",{className:"eg-path__primary",d:"M8 4L19 12L8 20Z",style:{filter:"url(#dropshadow)"}})]})},te=function(e){var t=Object.assign({},e);return Object(w.jsxs)("div",Object(j.a)(Object(j.a)({className:"eg-splash"},t),{},{children:[Object(w.jsx)("h3",{className:"eg-splash__title",children:"Hello."}),Object(w.jsx)(ee,{}),Object(w.jsx)("h3",{className:"eg-splash__title-2",children:"Click this."}),Object(w.jsx)("h3",{className:"eg-splash__title-3",children:"It'll be fun."})]}))},le=new AudioContext,re=function(){d.a.render(Object(w.jsx)(i.a.StrictMode,{children:Object(w.jsx)(Y,{})}),document.getElementById("root"))};function ae(){return(ae=Object(c.a)(a.a.mark((function e(){return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,s.a.initialize(le,{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[2]});case 2:e.sent.connect(le.destination);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}s.a.on("load",(function(){"running"!==le.state?d.a.render(Object(w.jsx)(te,{onClick:function(){return le.resume().then((function(){return re()}))}}),document.getElementById("root")):re()})),function(){ae.apply(this,arguments)}()}},[[41,1,2]]]);
//# sourceMappingURL=main.edf94116.chunk.js.map