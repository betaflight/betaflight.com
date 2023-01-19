"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7189],{3905:(e,r,t)=>{t.d(r,{Zo:()=>c,kt:()=>m});var n=t(67294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function s(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=n.createContext({}),u=function(e){var r=n.useContext(l),t=r;return e&&(t="function"==typeof e?e(r):i(i({},r),e)),t},c=function(e){var r=u(e.components);return n.createElement(l.Provider,{value:r},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},f=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),d=u(t),f=a,m=d["".concat(l,".").concat(f)]||d[f]||p[f]||o;return t?n.createElement(m,i(i({ref:r},c),{},{components:t})):n.createElement(m,i({ref:r},c))}));function m(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=f;var s={};for(var l in r)hasOwnProperty.call(r,l)&&(s[l]=r[l]);s.originalType=e,s[d]="string"==typeof e?e:a,i[1]=s;for(var u=2;u<o;u++)i[u]=t[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,t)}f.displayName="MDXCreateElement"},44270:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var n=t(87462),a=(t(67294),t(3905));const o={},i=void 0,s={unversionedId:"boards/FRSKYF4",id:"boards/FRSKYF4",title:"FRSKYF4",description:"FRSKYF4 Board",source:"@site/docs/boards/FRSKYF4.md",sourceDirName:"boards",slug:"/boards/FRSKYF4",permalink:"/docs/boards/FRSKYF4",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"FRSKYF3",permalink:"/docs/boards/FRSKYF3"},next:{title:"**Overview**",permalink:"/docs/boards/FURYF3"}},l={},u=[{value:"FRSKYF4 Board",id:"frskyf4-board",level:2},{value:"MCU, Sensors and Features",id:"mcu-sensors-and-features",level:2},{value:"Hardware",id:"hardware",level:2},{value:"Features",id:"features",level:2},{value:"Manufacturers and Distributors",id:"manufacturers-and-distributors",level:2},{value:"Designers",id:"designers",level:2},{value:"Maintainers",id:"maintainers",level:2},{value:"Differences:",id:"differences",level:2}],c={toc:u};function d(e){let{components:r,...t}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"frskyf4-board"},"FRSKYF4 Board"),(0,a.kt)("p",null,"The Frsky F4 flight controller integrated Frsky's X8R Receiver,OSD and SD Card in one board. This board  use MPU6050.This board has no problem running fast loop times and ESC protocols. There is an On Screen Display (OSD) chip directly connected to the main processor (MCU). And the FC connect to the Receiver with SBUS and S.Port inner. You no longer need to mount another Reciver,and you can transimit FC's messages to Remote by Betaflight.\nFor maximum ease of use, some FrskyF4's board has an onboard PDB up to 6s with a battery XT60 JACK.Just plug your battery straight into the flight controller and you're ready to go!"),(0,a.kt)("h2",{id:"mcu-sensors-and-features"},"MCU, Sensors and Features"),(0,a.kt)("h2",{id:"hardware"},"Hardware"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"MCU: STM32F4"),(0,a.kt)("li",{parentName:"ul"},"IMU: MPU6000 (SPI)"),(0,a.kt)("li",{parentName:"ul"},"IMU Interrupt: Yes"),(0,a.kt)("li",{parentName:"ul"},"VCP: Yes"),(0,a.kt)("li",{parentName:"ul"},"Hardware UARTS: 3(UART1--\x3eSBUS UART6--\x3eS.PORT)"),(0,a.kt)("li",{parentName:"ul"},"OSD: BFOSD"),(0,a.kt)("li",{parentName:"ul"},"Blackbox: SD Card"),(0,a.kt)("li",{parentName:"ul"},"Battery Voltage Sensor: yes"),(0,a.kt)("li",{parentName:"ul"},"Integrated Voltage Regulator: Yes, supports up to 6S, 1AMP"),(0,a.kt)("li",{parentName:"ul"},"Brushed Motor Mosfets: No"),(0,a.kt)("li",{parentName:"ul"},"Buttons: 2 (1: DFU, 2:Receiver Bind)")),(0,a.kt)("h2",{id:"features"},"Features"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Current Sensor: PC1"),(0,a.kt)("li",{parentName:"ul"},"BlHeli passthrough: Yes"),(0,a.kt)("li",{parentName:"ul"},"WS2811 Led Strip: Yes"),(0,a.kt)("li",{parentName:"ul"},"Transponder: Yes"),(0,a.kt)("li",{parentName:"ul"},"Beeper: Inverted"),(0,a.kt)("li",{parentName:"ul"},"Receiver: Frsky X8R"),(0,a.kt)("li",{parentName:"ul"},"RSSI:  SBUS CHANNEL 8")),(0,a.kt)("h2",{id:"manufacturers-and-distributors"},"Manufacturers and Distributors"),(0,a.kt)("p",null,"  Frsky(Manufacturers)"),(0,a.kt)("p",null,"  Available here soon:",(0,a.kt)("a",{parentName:"p",href:"http://www.frsky-rc.com"},"http://www.frsky-rc.com")),(0,a.kt)("h2",{id:"designers"},"Designers"),(0,a.kt)("p",null,"  Frsky Co.Lt"),(0,a.kt)("h2",{id:"maintainers"},"Maintainers"),(0,a.kt)("p",null,"  shang2017"),(0,a.kt)("h2",{id:"differences"},"Differences:"),(0,a.kt)("p",null,"  add Receiver with FC on one board"))}d.isMDXComponent=!0}}]);