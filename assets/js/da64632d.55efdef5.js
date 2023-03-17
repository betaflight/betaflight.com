"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5274],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(r),m=a,f=d["".concat(s,".").concat(m)]||d[m]||c[m]||i;return r?n.createElement(f,o(o({ref:t},p),{},{components:r})):n.createElement(f,o({ref:t},p))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:a,o[1]=l;for(var u=2;u<i;u++)o[u]=r[u];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},17615:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>d,frontMatter:()=>i,metadata:()=>l,toc:()=>u});var n=r(87462),a=(r(67294),r(3905));const i={},o="YuPiF7 by Copperyu",l={unversionedId:"wiki/boards/YUPIF7",id:"wiki/boards/YUPIF7",title:"YuPiF7 by Copperyu",description:"An high quality flight controller for the most demanding pilotes.",source:"@site/docs/wiki/boards/YUPIF7.md",sourceDirName:"wiki/boards",slug:"/wiki/boards/YUPIF7",permalink:"/docs/wiki/boards/YUPIF7",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"wiki",previous:{title:"YuPiF4 by Copperyu",permalink:"/docs/wiki/boards/YUPIF4"},next:{title:"ZCOREF3",permalink:"/docs/wiki/boards/ZCOREF3"}},s={},u=[{value:"Description",id:"description",level:2},{value:"MCU, Sensors and Features",id:"mcu-sensors-and-features",level:2},{value:"Hardware",id:"hardware",level:3},{value:"Features",id:"features",level:3},{value:"Designers and Maintainers",id:"designers-and-maintainers",level:2},{value:"Manufacturers and Distributors",id:"manufacturers-and-distributors",level:2},{value:"Hardware Designs (if available)",id:"hardware-designs-if-available",level:2}],p={toc:u};function d(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"yupif7-by-copperyu"},"YuPiF7 by Copperyu"),(0,a.kt)("p",null,"An high quality flight controller for the most demanding pilotes."),(0,a.kt)("h2",{id:"description"},"Description"),(0,a.kt)("p",null,"The YuPiF7 is a 36x36mm (30.5x30.5 mounting holes) board with an F7 microcontroller."),(0,a.kt)("h2",{id:"mcu-sensors-and-features"},"MCU, Sensors and Features"),(0,a.kt)("h3",{id:"hardware"},"Hardware"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"MCU: STM32F722"),(0,a.kt)("li",{parentName:"ul"},"IMU: ICM-20689 (SPI)"),(0,a.kt)("li",{parentName:"ul"},"IMU Interrupt: Yes"),(0,a.kt)("li",{parentName:"ul"},"BARO: No"),(0,a.kt)("li",{parentName:"ul"},"VCP: Yes"),(0,a.kt)("li",{parentName:"ul"},"Hardware UARTS: 3 with an inverter for SBus"),(0,a.kt)("li",{parentName:"ul"},"Blackbox: SD card slot"),(0,a.kt)("li",{parentName:"ul"},"PPM : A specific pad is available for PPM input"),(0,a.kt)("li",{parentName:"ul"},"Battery Voltage Sensor: Yes, directly connected, no wiring needed"),(0,a.kt)("li",{parentName:"ul"},"Current sensor : Yes, directly connected, no wiring needed"),(0,a.kt)("li",{parentName:"ul"},"Integrated Voltage Regulator: the board can be powered by your lipo (2S to 6S)"),(0,a.kt)("li",{parentName:"ul"},"Brushed Motor Mosfets: No"),(0,a.kt)("li",{parentName:"ul"},"Motor outputs : can drive up to 6 motors"),(0,a.kt)("li",{parentName:"ul"},"Buttons: Boot0 to enter in DFU mode")),(0,a.kt)("h3",{id:"features"},"Features"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"BlHeli passthrough: Yes"),(0,a.kt)("li",{parentName:"ul"},"WS2811 Led Strip: Yes (on motor output Pin 5)"),(0,a.kt)("li",{parentName:"ul"},"Transponder: No")),(0,a.kt)("h2",{id:"designers-and-maintainers"},"Designers and Maintainers"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/ted-rcnet"},"RcNet")," and ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/Faduf"},"FaduF")),(0,a.kt)("h2",{id:"manufacturers-and-distributors"},"Manufacturers and Distributors"),(0,a.kt)("p",null,"This board is available in the shop FR Website : ",(0,a.kt)("a",{parentName:"p",href:"http://www.yupifc.com"},"http://www.yupifc.com")),(0,a.kt)("h2",{id:"hardware-designs-if-available"},"Hardware Designs (if available)"),(0,a.kt)("p",null,"The hardware is currently closed source."))}d.isMDXComponent=!0}}]);