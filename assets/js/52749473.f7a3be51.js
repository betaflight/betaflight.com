"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6132],{439:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>d});var a=i(85893),t=i(11151);const s={},r="VTX",o={id:"wiki/getting-started/hardware/vtx",title:"VTX",description:"Video Transmitters are commonly referred to as VTX units. These are typically analogue or digital systems transmitting on the 5.8GHz band, although other frequency bands are sometimes used for specialist long-range craft.",source:"@site/docs/wiki/getting-started/hardware/vtx.md",sourceDirName:"wiki/getting-started/hardware",slug:"/wiki/getting-started/hardware/vtx",permalink:"/docs/wiki/getting-started/hardware/vtx",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"wiki",previous:{title:"ESC firmware",permalink:"/docs/wiki/getting-started/hardware/esc-firmware"},next:{title:"Troubleshooting",permalink:"/docs/wiki/getting-started/troubleshooting"}},l={},d=[{value:"Analog FPV Video",id:"analog-fpv-video",level:2},{value:"Digital FPV Video",id:"digital-fpv-video",level:2}];function c(e){const n={a:"a",h1:"h1",h2:"h2",li:"li",p:"p",ul:"ul",...(0,t.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"vtx",children:"VTX"}),"\n",(0,a.jsx)(n.p,{children:"Video Transmitters are commonly referred to as VTX units. These are typically analogue or digital systems transmitting on the 5.8GHz band, although other frequency bands are sometimes used for specialist long-range craft."}),"\n",(0,a.jsx)(n.h2,{id:"analog-fpv-video",children:"Analog FPV Video"}),"\n",(0,a.jsx)(n.p,{children:"Analogue video systems transmit a CVBS signal in either PAL or NTSC using channels in the 5.8GHz band."}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["Orginally the FPV hardware in quadcopters was based on analogue security cameras and the associated transmission equipment.","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Early boards required manual channel selection using physical switches on the transmitter which was inconvenient for pilots"}),"\n",(0,a.jsx)(n.li,{children:"Pilots could easily power on and interrupt video for pilots already flying."}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["Cameras improved over time and VTX hardware has become more tightly integrated into the overall FPV experience.","\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.a,{href:"/docs/wiki/guides/current/SmartAudio",children:"SmartAudio from TBS"})," and ",(0,a.jsx)(n.a,{href:"/docs/wiki/guides/current/IRC-Tramp",children:"Tramp from ImmersionRC"})," - allow users to change their video channel, band and power output from the FC. Pilots must supply a list of valid channnels, bands and power levels to the FC called a ",(0,a.jsx)(n.a,{href:"/docs/wiki/guides/current/VTX-Tables",children:"VTX Table"})]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.a,{href:"https://github.com/OpenVTx/OpenVTx",children:"OpenVTX"})," introduced MSP VTX control. MSP VTXs can annouce available channel, band and power information so VTX Tables are not required."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.a,{href:"https://github.com/ExpressLRS/Backpack/wiki",children:"ExpressLRS backpack"})," combines the ability to control any SmartAudio, Tramp or MSP VTX whilst simultaneously setting the same channel on the goggles."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"Originally the OSD for these systems was a separate add-in board such as Minim OSD, these have been replaced by OSD chips onboard the FC. This AT7456 is used on many FCs for this purpose and combines a black/white text-based OSD onto a video feed from the camera before sending the video signal to the VTX for transmission."}),"\n",(0,a.jsx)(n.h2,{id:"digital-fpv-video",children:"Digital FPV Video"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"https://www.hd-zero.com/",children:"HDZero"})," is a unidirectional digital video system seen as the continuation of prior analogue video techniques"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Uses the same frequency bands and analogue Raceband inter-operates with pilots flying analogue video without disruption to other channels."}),"\n",(0,a.jsx)(n.li,{children:"Allows MSP VTX control of band and channel from the FC"}),"\n",(0,a.jsx)(n.li,{children:"Integrates with eLRS backpacks for seamless VTX and Goggles integration"}),"\n",(0,a.jsx)(n.li,{children:"MSP Displayport is implemented and working."}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"https://www.dji.com/fpv",children:"DJI FPV"}),' v1 was launched in 2019 as the first widely available digital FPV system suitable for installation in 5" quadcopters.']}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"DJI FPV v1 consisted of the Goggles v1 (and later Goggles v2)"}),"\n",(0,a.jsx)(n.li,{children:'2 VTXs were available - a large dual-antenna "air unit" with no mounting holes and a smaller single-antenna "air unit lite" with 20x20 M2 mounting holes'}),"\n",(0,a.jsx)(n.li,{children:"Larger VTX claimed 1080p onboard microSD DVR recording. Recording on air unit was unreliable and recordings would often stop after several seconds."}),"\n",(0,a.jsx)(n.li,{children:"Digital video performance is adequate but the OSD is poorly implemented and lacks support for critical elements like Warnings"}),"\n",(0,a.jsx)(n.li,{children:"WTFOS is an after-market system enabling full OSD support for the original DJI FPV system"}),"\n",(0,a.jsx)(n.li,{children:"Several models of non-DJI camera have been available from Caddx and Runcam."}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"https://www.dji.com/newsroom/news/dji-launches-o3-air-unit",children:"DJI O3"})," launched in 2022 as the successor to the v1 system."]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"New Goggles were launched called the Goggles 2 (different from the Goggles v2)"}),"\n",(0,a.jsx)(n.li,{children:"New VTX and camera was launched called the O3 Air Unit. Image quality and range are improved from v1."}),"\n",(0,a.jsx)(n.li,{children:"Goggles 2 can work with previous generation Air Unit Lite with a firmware update (will stop the air unit working on Goggles v1 and v2)"}),"\n",(0,a.jsx)(n.li,{children:"Goggles v2 can switch to a mode that works with O3 Air Units, but this can erase pairings with previous generation Air Units"}),"\n",(0,a.jsxs)(n.li,{children:["Onboard 4K DVR is available comparable to the DJI Action 2, and compatible with free ",(0,a.jsx)(n.a,{href:"https://gyroflow.xyz/",children:"GyroFlow stabilisation"}),"."]}),"\n",(0,a.jsx)(n.li,{children:"MSP Displayport is partially implemented but some characters are not drawn correctly and bugs exist."}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"https://caddxfpv.com/collections/walksnail-avatar-system",children:"Caddx WalkSnail Avatar"})," launched in 2022 as a new digital VTX."]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Variety of goggles, standalone VRX, VTX and cameras are available."}),"\n",(0,a.jsx)(n.li,{children:"Goggles initially based on FatShark partnership, new models produced by Caddx."}),"\n",(0,a.jsx)(n.li,{children:"Similar performance to DJI v1 but smaller VTXs"}),"\n",(0,a.jsx)(n.li,{children:"Onboard DVR at 1080p to internal flash - 8GB or 32GB"}),"\n",(0,a.jsxs)(n.li,{children:["v2 and newer cameras feature onboard gyros and can record data for use in free ",(0,a.jsx)(n.a,{href:"https://gyroflow.xyz/",children:"GyroFlow stabilisation"}),"."]}),"\n",(0,a.jsx)(n.li,{children:"MSP displayport is fully implemented and supports coloured fonts with Betaflight 4.5."}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["Digital video systems typically render the OSD in the FPV goggles instead of prior to transmitting. This is due to a number of factors, including the processing cost of overlaying OSD onto high resolution digital video in the low-power VTX and also the tendency of digital video compression algorithms to deal poorly with sharp text characters. Rendering the OSD on the goggles is a compromise that provides low latency video with clear OSD text. OSD data is sent via a UART from the FC to the VTX using the ",(0,a.jsx)(n.a,{href:"/docs/development/api/DisplayPort",children:"MSP Displayport protocol"})," and sent a separate OSD data feed is sent alongside the video stream to the goggles."]}),"\n"]}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},11151:(e,n,i)=>{i.d(n,{Z:()=>o,a:()=>r});var a=i(67294);const t={},s=a.createContext(t);function r(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);