"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7005],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var r=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=c(n),f=o,h=p["".concat(s,".").concat(f)]||p[f]||d[f]||a;return n?r.createElement(h,l(l({ref:t},u),{},{components:n})):r.createElement(h,l({ref:t},u))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=f;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[p]="string"==typeof e?e:o,l[1]=i;for(var c=2;c<a;c++)l[c]=n[c];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},25824:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>l,default:()=>p,frontMatter:()=>a,metadata:()=>i,toc:()=>c});var r=n(87462),o=(n(67294),n(3905));const a={},l="Installation",i={unversionedId:"development/Installation",id:"development/Installation",title:"Installation",description:"Using the configurator",source:"@site/docs/development/Installation.md",sourceDirName:"development",slug:"/development/Installation",permalink:"/docs/development/Installation",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"development",previous:{title:"In-flight Adjustments",permalink:"/docs/development/Inflight Adjustments"},next:{title:"Integrated Yaw",permalink:"/docs/development/IntegratedYaw"}},s={},c=[{value:"Using the configurator",id:"using-the-configurator",level:2},{value:"Manually",id:"manually",level:2},{value:"Backup/Restore process",id:"backuprestore-process",level:2}],u={toc:c};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"installation"},"Installation"),(0,o.kt)("h2",{id:"using-the-configurator"},"Using the configurator"),(0,o.kt)("p",null,"This is a generic procedure to flash a board using the configurator. The configurator does not yet support all boards, so please check the documentation corresponding to your board before proceeding."),(0,o.kt)("p",null,"Make sure you have the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/cleanflight/cleanflight-configurator"},"Cleanflight Configurator")," installed, then:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Connect the flight controller to the PC."),(0,o.kt)("li",{parentName:"ul"},"Start the Cleanflight Configurator."),(0,o.kt)("li",{parentName:"ul"},'Click on "Disconnect" if the configurator connected to the board automatically.'),(0,o.kt)("li",{parentName:"ul"},'Click on the "Firmware Flasher" tab.'),(0,o.kt)("li",{parentName:"ul"},'Make sure you have internet connectivity and click on the "Load Firmware ',"[Online]",'" button.'),(0,o.kt)("li",{parentName:"ul"},'Click on the "Choose a Firmware / Board" dropdown menu, and select the latest stable version for your flight controller.'),(0,o.kt)("li",{parentName:"ul"},"IMPORTANT: Read and understand the release notes that are displayed. When upgrading review all release notes since your current firmware."),(0,o.kt)("li",{parentName:"ul"},'If this is the first time Cleanflight is flashed to the board, tick the "Full Chip Erase" checkbox.'),(0,o.kt)("li",{parentName:"ul"},"Connect the flight controller board to the PC. Ensure the correct serial port is selected."),(0,o.kt)("li",{parentName:"ul"},'Click on the "Flash Firmware" button and hold still (do not breathe, too).'),(0,o.kt)("li",{parentName:"ul"},'When the progress bar becomes green and reads "Programming: SUCCESSFUL" you are done!')),(0,o.kt)("h2",{id:"manually"},"Manually"),(0,o.kt)("p",null,"See the board specific flashing instructions."),(0,o.kt)("h1",{id:"upgrading"},"Upgrading"),(0,o.kt)("p",null,"When upgrading be sure to backup / dump your existing settings. Some firmware releases are not backwards compatible and default settings are restored when the FC detects an out of date configuration."),(0,o.kt)("h2",{id:"backuprestore-process"},"Backup/Restore process"),(0,o.kt)("p",null,"See the CLI section of the docs for details on how to backup and restore your configuration via the CLI."))}p.isMDXComponent=!0}}]);