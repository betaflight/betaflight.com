"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5602],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>h});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),u=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},c=function(e){var t=u(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),d=u(r),m=a,h=d["".concat(s,".").concat(m)]||d[m]||p[m]||o;return r?n.createElement(h,i(i({ref:t},c),{},{components:r})):n.createElement(h,i({ref:t},c))}));function h(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:a,i[1]=l;for(var u=2;u<o;u++)i[u]=r[u];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},85162:(e,t,r)=>{r.d(t,{Z:()=>i});var n=r(67294),a=r(86010);const o="tabItem_Ymn6";function i(e){let{children:t,hidden:r,className:i}=e;return n.createElement("div",{role:"tabpanel",className:(0,a.Z)(o,i),hidden:r},t)}},65488:(e,t,r)=>{r.d(t,{Z:()=>m});var n=r(87462),a=r(67294),o=r(86010),i=r(72389),l=r(67392),s=r(7094),u=r(12466);const c="tabList__CuJ",d="tabItem_LNqP";function p(e){const{lazy:t,block:r,defaultValue:i,values:p,groupId:m,className:h}=e,v=a.Children.map(e.children,(e=>{if((0,a.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),f=p??v.map((e=>{let{props:{value:t,label:r,attributes:n}}=e;return{value:t,label:r,attributes:n}})),g=(0,l.l)(f,((e,t)=>e.value===t.value));if(g.length>0)throw new Error(`Docusaurus error: Duplicate values "${g.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const b=null===i?i:i??v.find((e=>e.props.default))?.props.value??v[0].props.value;if(null!==b&&!f.some((e=>e.value===b)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${b}" but none of its children has the corresponding value. Available values are: ${f.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:k,setTabGroupChoices:y}=(0,s.U)(),[w,S]=(0,a.useState)(b),T=[],{blockElementScrollPositionUntilNextRender:N}=(0,u.o5)();if(null!=m){const e=k[m];null!=e&&e!==w&&f.some((t=>t.value===e))&&S(e)}const O=e=>{const t=e.currentTarget,r=T.indexOf(t),n=f[r].value;n!==w&&(N(t),S(n),null!=m&&y(m,String(n)))},R=e=>{let t=null;switch(e.key){case"Enter":O(e);break;case"ArrowRight":{const r=T.indexOf(e.currentTarget)+1;t=T[r]??T[0];break}case"ArrowLeft":{const r=T.indexOf(e.currentTarget)-1;t=T[r]??T[T.length-1];break}}t?.focus()};return a.createElement("div",{className:(0,o.Z)("tabs-container",c)},a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.Z)("tabs",{"tabs--block":r},h)},f.map((e=>{let{value:t,label:r,attributes:i}=e;return a.createElement("li",(0,n.Z)({role:"tab",tabIndex:w===t?0:-1,"aria-selected":w===t,key:t,ref:e=>T.push(e),onKeyDown:R,onClick:O},i,{className:(0,o.Z)("tabs__item",d,i?.className,{"tabs__item--active":w===t})}),r??t)}))),t?(0,a.cloneElement)(v.filter((e=>e.props.value===w))[0],{className:"margin-top--md"}):a.createElement("div",{className:"margin-top--md"},v.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==w})))))}function m(e){const t=(0,i.Z)();return a.createElement(p,(0,n.Z)({key:String(t)},e))}},23208:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var n=r(87462),a=(r(67294),r(3905));r(65488),r(85162);const o={sidebar_position:8},i="Receiver Tab",l={unversionedId:"wiki/configurator/receiver-tab",id:"wiki/configurator/receiver-tab",title:"Receiver Tab",description:"A receiver is a device that (as its name suggests) receives data from a transmitter, usually your",source:"@site/docs/wiki/configurator/receiver-tab.mdx",sourceDirName:"wiki/configurator",slug:"/wiki/configurator/receiver-tab",permalink:"/docs/wiki/configurator/receiver-tab",draft:!1,tags:[],version:"current",sidebarPosition:8,frontMatter:{sidebar_position:8},sidebar:"wiki",previous:{title:"PID Tuning Tab",permalink:"/docs/wiki/configurator/pid-tuning-tab"},next:{title:"Modes Tab",permalink:"/docs/wiki/configurator/auxiliary-tab"}},s={},u=[{value:"Output Preview",id:"output-preview",level:2},{value:"Receiver Configuration",id:"receiver-configuration",level:2},{value:"Receiver",id:"receiver",level:3},{value:"Telemetry",id:"telemetry",level:3},{value:"RSSI",id:"rssi",level:3},{value:"Channel Map",id:"channel-map",level:3},{value:"RSSI Channel",id:"rssi-channel",level:3},{value:"&quot;Stick&quot; Settings",id:"stick-settings",level:3},{value:"Deadband Settings",id:"deadband-settings",level:3},{value:"RC Smoothing",id:"rc-smoothing",level:3}],c={toc:u};function d(e){let{components:t,...o}=e;return(0,a.kt)("wrapper",(0,n.Z)({},c,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"receiver-tab"},"Receiver Tab"),(0,a.kt)("p",null,"A receiver is a device that (as its name suggests) receives data from a transmitter, usually your\nradio controller. The receiver tab is used to configure the FC such that it can read the receiver data.\nThe receiver tab is divided into two sections: the receiver output preview and the receiver configuration."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Receiver Tab",src:r(94002).Z,width:"1617",height:"725"})),(0,a.kt)("h2",{id:"output-preview"},"Output Preview"),(0,a.kt)("p",null,"The receiver output preview shows the current state of the receiver channels, both in channel value and graph forms, and how those affect the drone movement."),(0,a.kt)("h2",{id:"receiver-configuration"},"Receiver Configuration"),(0,a.kt)("p",null,"Used to configure all of the settings that are specific to your receiver"),(0,a.kt)("h3",{id:"receiver"},"Receiver"),(0,a.kt)("p",null,"Select the communication protocol used by your receiver. The options are:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"PPM/CPPM")," - Legacy protocol, unlikely to be used in modern setups"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Serial-based")," - Most modern receivers communicate over serial, using different protocols like CRSF or SBUS"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"PWM")," - Legacy protocol, unlikely to be used in modern setups"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"MSP")," - An advanced option, using the MSP protocol to communicate with the receiver"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"SPI")," - Used for most integrated receivers, like ExpressLRS on tinywhoop AIO boards")),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"Selecting the incorrect protocol will lead to no signal being detected, or the signal being interpreted incorrectly. You have to pick the correct one for your receiver")),(0,a.kt)("h3",{id:"telemetry"},"Telemetry"),(0,a.kt)("p",null,"Toggle the telemetry output on or off. Also required for VTX control from ELRS receivers"),(0,a.kt)("h3",{id:"rssi"},"RSSI"),(0,a.kt)("p",null,"Mostly a legacy option, used to configure a separate analogue 0-3.3V RSSI input. Most modern receivers communicate\nRSSI (along with other telemetry data) over the same serial connection as the control data."),(0,a.kt)("p",null,"Do not enable this option with a modern receiver"),(0,a.kt)("h3",{id:"channel-map"},"Channel Map"),(0,a.kt)("p",null,"Different receivers output the four main control channels:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Aileron")," - Roll (left/right)"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Elevator")," - Pitch (forward/backward)"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Throttle")," - Throttle (up/down)"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Rudder")," - Yaw (left/right)")),(0,a.kt)("admonition",{type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"If your radio input does not match up to what you see in the preview, you need to change the channel map.\nThere are also preset options for some of the more common systems:"),(0,a.kt)("ul",{parentName:"admonition"},(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"FrSky/Futaba/Hitec")," - FrSky, Futaba, and Hitec receivers output the channels in the same order as the\nBetaflight default (AETR1234)"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Spektrum/Graupned/JR")," - Spektrum receivers output the channels in a different order than the Betaflight default\n(TAER1234)"))),(0,a.kt)("h3",{id:"rssi-channel"},"RSSI Channel"),(0,a.kt)("p",null,"Some older receivers only had RSSI output on a single channel. If you have an older receiver, you can set\nwhich channel is used to read the RSSI value. This is usually AUX 4 or 12.\nLeave this setting disabled if you have a modern receiver such one using the CRSF or GHST protocols"),(0,a.kt)("p",null,"One use case for this setting on modern equipment is to view LQ on DJI FPV goggles, which do not include a native LQ\nfield. In this case you can set this channel to the channel used for LQ - AUX11 on ELRS. A better solution is to\nenable the ",(0,a.kt)("inlineCode",{parentName:"p"},"osd_craftname_msgs")," CLI option or install WTFOS on your DJI FPV system for a full customisable OSD"),(0,a.kt)("h3",{id:"stick-settings"},'"Stick" Settings'),(0,a.kt)("p",null,"Minimum/Center/Maximum values for the four main control channels. These are used to set the range of the\nstick values, usually for safety and calibration purposes"),(0,a.kt)("h3",{id:"deadband-settings"},"Deadband Settings"),(0,a.kt)("p",null,"Deadband is the range of stick movement that is ignored. Some radios/receivers may have a small amount of\njitter, and this setting can be used to ignore that. You also have options to set it specifically for Yaw\nand 3d mode throttle"),(0,a.kt)("h3",{id:"rc-smoothing"},"RC Smoothing"),(0,a.kt)("p",null,"Toggle the RC smoothing filter on or off"))}d.isMDXComponent=!0},94002:(e,t,r)=>{r.d(t,{Z:()=>n});const n=r.p+"assets/images/betaflight_configurator_receiver_tab-6c2c19121e4eba8d1cc3f505d7d2ac74.png"}}]);