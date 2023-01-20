"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2213],{3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>f});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),d=c(n),m=o,f=d["".concat(l,".").concat(m)]||d[m]||u[m]||a;return n?r.createElement(f,i(i({ref:t},s),{},{components:n})):r.createElement(f,i({ref:t},s))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var p={};for(var l in t)hasOwnProperty.call(t,l)&&(p[l]=t[l]);p.originalType=e,p[d]="string"==typeof e?e:o,i[1]=p;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},61786:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>a,metadata:()=>p,toc:()=>c});var r=n(87462),o=(n(67294),n(3905));const a={},i=void 0,p={unversionedId:"development/boards/CC3D",id:"development/boards/CC3D",title:"CC3D",description:"Flashing Cleanflight/BetaFlight to CC3D with Mainport and FTDI Video:",source:"@site/docs/development/boards/CC3D.md",sourceDirName:"development/boards",slug:"/development/boards/CC3D",permalink:"/docs/development/boards/CC3D",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"development",previous:{title:"BLUEJAYF4",permalink:"/docs/development/boards/BLUEJAYF4"},next:{title:"Board - ChebuzzF3",permalink:"/docs/development/boards/CHEBUZZF3"}},l={},c=[{value:"Flashing Cleanflight/BetaFlight to CC3D with Mainport and FTDI Video:",id:"flashing-cleanflightbetaflight-to-cc3d-with-mainport-and-ftdi-video",level:2},{value:"Beeper setup",id:"beeper-setup",level:2}],s={toc:c};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"flashing-cleanflightbetaflight-to-cc3d-with-mainport-and-ftdi-video"},"Flashing Cleanflight/BetaFlight to CC3D with Mainport and FTDI Video:"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=5wjvJAMEMz0"},"https://www.youtube.com/watch?v=5wjvJAMEMz0")),(0,o.kt)("h2",{id:"beeper-setup"},"Beeper setup"),(0,o.kt)("p",null,"Posted by handsomejackuk:\nso i have figured out that I need to configure resources separately in betaflight 3.16 and so far on cc3d have setup my buzzer on pin 6 as confirmed working with older versions of betaflight..."),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"# resource"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"resource BEEPER 1 A02"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"resource MOTOR 1 B09"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"resource MOTOR 2 B08"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"resource MOTOR 3 B07"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"resource MOTOR 4 A08"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"resource MOTOR 5 B04"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"resource PPM 1 A01"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"resource PWM 2 B05"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"resource PWM 3 B00"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"resource PWM 4 B01"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"resource PWM 5 A00"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"resource PWM 6 A01"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"resource SERIAL_TX 3 B10"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"resource SERIAL_TX 11 B05"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"resource SERIAL_RX 3 B11"),"\n",(0,o.kt)("inlineCode",{parentName:"p"},"resource SERIAL_RX 11 B00")))}d.isMDXComponent=!0}}]);