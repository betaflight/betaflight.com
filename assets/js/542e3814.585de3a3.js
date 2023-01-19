"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3609],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var a=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=a.createContext({}),u=function(e){var t=a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),c=u(r),d=n,f=c["".concat(s,".").concat(d)]||c[d]||m[d]||o;return r?a.createElement(f,i(i({ref:t},p),{},{components:r})):a.createElement(f,i({ref:t},p))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[c]="string"==typeof e?e:n,i[1]=l;for(var u=2;u<o;u++)i[u]=r[u];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}d.displayName="MDXCreateElement"},2672:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var a=r(87462),n=(r(67294),r(3905));const o={},i=void 0,l={unversionedId:"boards/NERO",id:"boards/NERO",title:"NERO",description:"Description",source:"@site/docs/boards/NERO.md",sourceDirName:"boards",slug:"/boards/NERO",permalink:"/docs/boards/NERO",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"MultiFlite PICO-B-FC",permalink:"/docs/boards/MULTIFLITEPICO"},next:{title:"OMNIBUS-F4-Pro-Corners",permalink:"/docs/boards/OMNIBUS-F4-Pro-Corners"}},s={},u=[{value:"Description",id:"description",level:2},{value:"MCU, Sensors and Features",id:"mcu-sensors-and-features",level:2},{value:"Hardware",id:"hardware",level:3},{value:"Features",id:"features",level:3},{value:"Manufacturers and Distributors",id:"manufacturers-and-distributors",level:2},{value:"Configuration Information",id:"configuration-information",level:2},{value:"Wiring Diagrams",id:"wiring-diagrams",level:3},{value:"Schematics",id:"schematics",level:3}],p={toc:u};function c(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h2",{id:"description"},"Description"),(0,n.kt)("p",null,"Beautifully simple STM32F7 based flightcontroller. A F7 replacement for the Naze."),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://betaflight.com/assets/img/boards/nero/nero-rev1-top.jpg",alt:"NERO (TOP) - rev1"}),"\n",(0,n.kt)("img",{parentName:"p",src:"https://betaflight.com/assets/img/boards/nero/nero-rev1-bottom.jpg",alt:"NERO (BOTTOM) - rev1"})),(0,n.kt)("h2",{id:"mcu-sensors-and-features"},"MCU, Sensors and Features"),(0,n.kt)("h3",{id:"hardware"},"Hardware"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Size: 36x36mm (30.5x30.5 mounting holes)"),(0,n.kt)("li",{parentName:"ul"},"MCU: STM32F722RET6"),(0,n.kt)("li",{parentName:"ul"},"IMU: ICM-20602 (SPI)"),(0,n.kt)("li",{parentName:"ul"},"IMU Interrupt: Yes"),(0,n.kt)("li",{parentName:"ul"},"VCP: Yes"),(0,n.kt)("li",{parentName:"ul"},"Hardware UARTS: 3"),(0,n.kt)("li",{parentName:"ul"},"OSD: Compatible pin-outs for MinimOSD on UART3 (stackable)"),(0,n.kt)("li",{parentName:"ul"},"Blackbox: SD card"),(0,n.kt)("li",{parentName:"ul"},"PPM/UART Shared: UART6"),(0,n.kt)("li",{parentName:"ul"},"Battery Voltage Sensor: Yes, directly connected, no wiring necessary (if using pololu on full size)"),(0,n.kt)("li",{parentName:"ul"},"Integrated Voltage Regulator: Pololu piggy back option"),(0,n.kt)("li",{parentName:"ul"},"Button for putting board into DFU mode")),(0,n.kt)("h3",{id:"features"},"Features"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Current Sensor: available as ADC input, but requires shunt circuit on PDB or battery cable."),(0,n.kt)("li",{parentName:"ul"},"BlHeli passthrough: Yes"),(0,n.kt)("li",{parentName:"ul"},"WS2811 Led Strip: Yes (on motor output Pin 5)"),(0,n.kt)("li",{parentName:"ul"},"Transponder: No"),(0,n.kt)("li",{parentName:"ul"},"SPI (2) is broken out for adding an SPI peripheral, e.g. another GYRO.")),(0,n.kt)("h2",{id:"manufacturers-and-distributors"},"Manufacturers and Distributors"),(0,n.kt)("p",null,"These boards are now currently available. Shipping of pre-orders is occurring now."),(0,n.kt)("p",null,"Available here:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://www.fpvgame.eu/product-page/fc-f7-nero"},"fpvgame.eu")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://www.electricwingman.com/nero-f7-flight-controller"},"electricwingman.com")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"http://www.readytoflyquads.com/nero-f7-flight-controller"},"readytoflyquads.com"))),(0,n.kt)("p",null,"More information available here:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://nerofc.com"},"nerofc.com"))),(0,n.kt)("h2",{id:"configuration-information"},"Configuration Information"),(0,n.kt)("h3",{id:"wiring-diagrams"},"Wiring Diagrams"),(0,n.kt)("p",null,"Main wiring details:"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://betaflight.com/assets/img/boards/nero/nero-rev1-wiring.png",alt:"Wiring Diagram - rev1"})),(0,n.kt)("p",null,"Micro pin details:"),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://betaflight.com/assets/img/boards/nero/nero-rev1-micro-pins.png",alt:"Micro pins - rev1"})),(0,n.kt)("h3",{id:"schematics"},"Schematics"),(0,n.kt)("p",null,"The pin out for the MCU is provided here, so that it can be used as a reference for others considering developing a board using the same target. This is so targets can be minimised going forward. Hopefully the info will also assist other developers in adding features."),(0,n.kt)("p",null,(0,n.kt)("img",{parentName:"p",src:"https://betaflight.com/assets/img/boards/nero/nero-rev1-mcu-schematic.png",alt:"MCU Output Schematic - rev1"})),(0,n.kt)("h1",{id:"other-resources"},"Other Resources"),(0,n.kt)("p",null,"RC Groups Thread: ",(0,n.kt)("a",{parentName:"p",href:"https://www.rcgroups.com/forums/showthread.php?2734745-NERO-STM32F7-based-FC"},"https://www.rcgroups.com/forums/showthread.php?2734745-NERO-STM32F7-based-FC")))}c.isMDXComponent=!0}}]);