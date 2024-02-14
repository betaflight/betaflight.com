"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2879],{18413:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>h});var i=n(85893),r=n(11151);const o={},a="Flight Controller Orientation",s={id:"wiki/guides/current/Flight-Controller-Orientation",title:"Flight Controller Orientation",description:"Usually, the gyro orientation on the FC is ink-marked by an arrow pointing forward.",source:"@site/docs/wiki/guides/current/Flight-Controller-Orientation.md",sourceDirName:"wiki/guides/current",slug:"/wiki/guides/current/Flight-Controller-Orientation",permalink:"/docs/wiki/guides/current/Flight-Controller-Orientation",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"wiki",previous:{title:"Flight Controller Gyro Orientation",permalink:"/docs/wiki/guides/current/Flight-Controller-Gyro-Orientation"},next:{title:"Flying Tips",permalink:"/docs/wiki/guides/current/Flying-Tips"}},l={},h=[];function d(e){const t={a:"a",h1:"h1",li:"li",ol:"ol",p:"p",...(0,r.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"flight-controller-orientation",children:"Flight Controller Orientation"}),"\n",(0,i.jsx)(t.p,{children:"Usually, the gyro orientation on the FC is ink-marked by an arrow pointing forward."}),"\n",(0,i.jsx)(t.p,{children:"In rare cases or due to space limitations, the flight controller needs to be positioned on the frame in awkward alignment, i.e. pivoted around multiple axes, NOT lining up with the main axes of the frame anymore."}),"\n",(0,i.jsx)(t.p,{children:"The FC firmware NEEDS to know how the FC axes are oriented with respect to the frame axes, otherwise the PID controller will misinterpret flight attitude and corrective actions, this will lead to unstable behaviour and flyaways. To keep all controls working as usual, you need to set the matching angle values in the Betaflight Configurator Configuration tab. These angles will tell the FC how to rotate the frame around multiple axes to fall in line with the alignment of the FC."}),"\n",(0,i.jsx)(t.p,{children:"It is important to note that there is a sequence of so-called Euler angles (axes of rotation in space, perpendicular to each other) for board/gyro alignment: yaw-pitch-roll or 3-2-1 Euler angles."}),"\n",(0,i.jsx)(t.p,{children:"The internal rotation convention bf uses to represent the FC orientation is R = Rz(-Yaw) _ Ry(-Pitch) _ Rx(-Roll). On one hand the rotation matrix R describes how the FC with respect to the origin of the quad is rotated. On the other hand R describes the transformation of sensor readings of the FC as they were measured with a flight controller aligned with the quads frame (arrow pointing forward / x axis)."}),"\n",(0,i.jsx)(t.p,{children:"For the alignment process its easier to think in the inverse transform R^T = Rx^T(-Roll) _ Ry^T(-Pitch) _ Rz^T(-Yaw). So we yaw first around the z axis, then pitch the yawed frame around its new y axis and finally roll the yawed and pitched frame around its new x axis. Due to the minus sign positiv angle direction is described by the left hand rule, e.g. to yaw positive you grab the z axis with your left hand and rotate towards the direction of your fingers."}),"\n",(0,i.jsxs)(t.p,{children:["You can use the following link to figure out your board alignment angles: ",(0,i.jsx)(t.a,{href:"https://www.geogebra.org/3d/sj5aeucn",children:"https://www.geogebra.org/3d/sj5aeucn"})]}),"\n",(0,i.jsx)(t.p,{children:"For the alignment process think of a frame mounted to your quad and a frame mounted to your FC. The question that then needs to be answered is how to rotate the quads frame (x pointing forward, y left, z upwards) so that the quads frame is aligned to the flight controller frame (x pointing forward on your flight controller (mind the arrow), y to the left, z upwards)."}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsx)(t.li,{children:"Yaw the quad frame around its z axis"}),"\n",(0,i.jsx)(t.li,{children:"Pitch the already yawed frame around its new y axis"}),"\n",(0,i.jsx)(t.li,{children:"Roll the already yawed and pitched frame around its new x axis"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"To test your alignment process before you mount it to your frame use the FC only pointing towards your monitor and the the Setup page of the Betaflight Configurator and simply start with:"}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsx)(t.li,{children:"Yaw the FC, hit Reset Z axis, check the visualisation of the quad, if ok proceed"}),"\n",(0,i.jsx)(t.li,{children:"Pitch the yawed FC, reset Z axis, check, if ok proceed"}),"\n",(0,i.jsx)(t.li,{children:"Roll the yawed and pitched FC, reset Z axis, check, if ok proceed"}),"\n",(0,i.jsx)(t.li,{children:"Double check!"}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"After determining these 3 correction angles needed to rotate the quad frame into the FC frame, the values for yaw, pitch and roll can be entered into the respective fields in the Betaflight Configurator."})]})}function c(e={}){const{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>s,a:()=>a});var i=n(67294);const r={},o=i.createContext(r);function a(e){const t=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),i.createElement(o.Provider,{value:t},e.children)}}}]);