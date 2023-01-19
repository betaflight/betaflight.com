"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8165],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>h});var o=r(67294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var s=o.createContext({}),u=function(e){var t=o.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=u(e.components);return o.createElement(s.Provider,{value:t},e.children)},p="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},f=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),p=u(r),f=n,h=p["".concat(s,".").concat(f)]||p[f]||m[f]||a;return r?o.createElement(h,i(i({ref:t},c),{},{components:r})):o.createElement(h,i({ref:t},c))}));function h(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:n,i[1]=l;for(var u=2;u<a;u++)i[u]=r[u];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}f.displayName="MDXCreateElement"},42084:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>l,toc:()=>u});var o=r(87462),n=(r(67294),r(3905));const a={},i=void 0,l={unversionedId:"old/configuration/motor/ESC-Telemetry",id:"old/configuration/motor/ESC-Telemetry",title:"ESC-Telemetry",description:"As of Version 3.1.0 RC1 the ability to read ESC telemetry from KISS 24A ESCs exists in Betaflight.",source:"@site/docs/old/configuration/motor/ESC-Telemetry.md",sourceDirName:"old/configuration/motor",slug:"/old/configuration/motor/ESC-Telemetry",permalink:"/docs/old/configuration/motor/ESC-Telemetry",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"DSHOT-ESC-Protocol",permalink:"/docs/old/configuration/motor/DSHOT-ESC-Protocol"},next:{title:"Remapping-Motors-with-Resource-Command-(3.1)",permalink:"/docs/old/configuration/motor/Remapping-Motors-with-Resource-Command-(3.1)"}},s={},u=[{value:"Requirements:",id:"requirements",level:3},{value:"Procedure:",id:"procedure",level:3}],c={toc:u};function p(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,o.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"As of Version 3.1.0 RC1 the ability to read ESC telemetry from KISS 24A ESCs exists in Betaflight.")),(0,n.kt)("p",null,"This page is intended to be a quick guide on how to set up ESC telemetry and will require a basic understanding of terms and equipment which can be found elsewhere within the wiki or through researching each term separately. This version of the guide won't cover how to get telemetry set up from the flight controller to the RC receiver and back to the RC Transmitter, that is part of the prerequisites and is currently listed as optional."),(0,n.kt)("h3",{id:"requirements"},"Requirements:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},"Supported flight controller with Betaflight version 3.1.0 RC1 or later."),(0,n.kt)("li",{parentName:"ul"},"Betaflight configurator version 1.8.5 or later."),(0,n.kt)("li",{parentName:"ul"},"Kiss 24A ESCs with Dshot capable firmware."),(0,n.kt)("li",{parentName:"ul"},"One spare hardware UART on the flight controller."),(0,n.kt)("li",{parentName:"ul"},"(Optional) Telemetry from flight controller to RC receiver.")),(0,n.kt)("h3",{id:"procedure"},"Procedure:"),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Install the ESCs")," to the quad and run a wire from all four telemetry pads on the ESCs to the RX pin of the spare hardware UART on the flight controller. It may be easier to make a loom to split a single wire from the RX pin of the UART into four wires (one for each ESC)."),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Open the Betaflight configurator (V 1.8.5 or later) and go to the Ports tab.")),(0,n.kt)("p",null,'Find the UART that the ESC telemetry is connected to and in the column marked "Sensor Input", select ESC in the left box and leave AUTO in the right box. Don\'t forget to hit the "save and reboot" button.'),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Still in Betaflight configurator, switch to the Configuration tab.")),(0,n.kt)("p",null,(0,n.kt)("em",{parentName:"p"},(0,n.kt)("strong",{parentName:"em"},"Make sure you are using the Dshot protocol for ESC communication!"))),(0,n.kt)("p",null,'Under "Other Features", make sure that "ESC_SENSOR" is enabled.'),(0,n.kt)("p",null,'On the Battery Voltage section enable "VBAT" and select ESC Sensor from the drop down menu below. Configure the cell voltages as required. (Defaults should be fine)'),(0,n.kt)("p",null,'On the Current Sensor section enable "CURRENT_METER" and select ESC Sensor from the drop down menu below. Configure the scale and offset as required. (Defaults should be fine)'),(0,n.kt)("p",null,(0,n.kt)("em",{parentName:"p"},"To test, set it all up then plug in the flight controller as well as the battery, open the configurator to the configuration tab and arm via the tx within a few seconds of powering on the flight controller. PROPS OFF ON THE BENCH!")),(0,n.kt)("p",null,(0,n.kt)("strong",{parentName:"p"},"Confirm that telemetry is being received by the transmitter.")),(0,n.kt)("p",null,"If using a Taranis, don't forget to arm the quad when you \"Discover Sensors\" or the ESC telemetry won't be discovered."),(0,n.kt)("p",null,'Taranis users may want to change the "FUEL" sensor from % to mAh for an accurate reading.'))}p.isMDXComponent=!0}}]);