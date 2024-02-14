"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8991],{23073:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>c});var i=n(85893),r=n(11151);const s={},o="Nucleo H743 - RAM based",a={id:"wiki/boards/NUCLEOH743",title:"Nucleo H743 - RAM based",description:"This target for the Nucleo H743 is loaded entirely into the MCU RAM, thus facilitating quick turnaround development testing, without subjecting the flash storage to wear.",source:"@site/docs/wiki/boards/NUCLEOH743.md",sourceDirName:"wiki/boards",slug:"/wiki/boards/NUCLEOH743",permalink:"/docs/wiki/boards/NUCLEOH743",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"wiki",previous:{title:"NERO",permalink:"/docs/wiki/boards/NERO"},next:{title:"OMNIBUS-F4-Pro-Corners",permalink:"/docs/wiki/boards/OMNIBUS-F4-Pro-Corners"}},l={},c=[{value:"Board preparation",id:"board-preparation",level:2},{value:"Installation",id:"installation",level:2}];function d(e){const t={code:"code",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",ul:"ul",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"nucleo-h743---ram-based",children:"Nucleo H743 - RAM based"}),"\n",(0,i.jsx)(t.p,{children:"This target for the Nucleo H743 is loaded entirely into the MCU RAM, thus facilitating quick turnaround development testing, without subjecting the flash storage to wear."}),"\n",(0,i.jsx)(t.p,{children:"In order to flash / run it, the ST-Link tool available from ST Microelectronics has to be used."}),"\n",(0,i.jsx)(t.h2,{id:"board-preparation",children:"Board preparation"}),"\n",(0,i.jsx)(t.p,{children:"For the MCU to run the firmware from RAM after a reset, the boot address has to be changed:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"open the 'Option Bytes' dialog:"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"&#39;Option Bytes&#39; menu entry",src:n(9912).Z+"",width:"816",height:"596"})}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:["set the high word of BOOT_ADD0 to ",(0,i.jsx)(t.code,{children:"0x2401"}),":"]}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"set boot address",src:n(69465).Z+"",width:"400",height:"701"})}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"click 'Apply'."}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"installation",children:"Installation"}),"\n",(0,i.jsx)(t.p,{children:"Since the firmware image is only stored in RAM, this has to be done after every power cycle of the board."}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"open the 'Program' dialog:"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"&#39;Program&#39; menu entry",src:n(25015).Z+"",width:"816",height:"596"})}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"click 'Browse', select the 'NUCLEOH743_RAMBASED' hex image;"}),"\n",(0,i.jsx)(t.li,{children:"make sure 'Reset after programming' is checked;"}),"\n",(0,i.jsx)(t.li,{children:"click 'Start' to start programming:"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"load / run the program",src:n(24014).Z+"",width:"458",height:"315"})}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"After programming has completed the firmware will be run."}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},69465:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/NUCLEOH743_RAMBASED_boot_address-6142eb8e3065e8655b1cc9fd9a16b6fe.png"},9912:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/NUCLEOH743_RAMBASED_option_bytes-f99fe95a8d580a1ed1ff21c6148cbb9c.png"},25015:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/NUCLEOH743_RAMBASED_program-79617d96fa6c1d61f585057b3f0224d9.png"},24014:(e,t,n)=>{n.d(t,{Z:()=>i});const i=n.p+"assets/images/NUCLEOH743_RAMBASED_run-3f39360c0435b96004c1d7f85d237046.png"},11151:(e,t,n)=>{n.d(t,{Z:()=>a,a:()=>o});var i=n(67294);const r={},s=i.createContext(r);function o(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);