"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[538],{45942:(e,t,a)=>{a.d(t,{Z:()=>s});a(67294);var l=a(86010),i=a(85893);function s(e){let{title:t="<unset>",compact:a=!1,className:s,children:r,blur:o}=e;return(0,i.jsxs)("section",{className:s,children:[(0,i.jsx)("h2",{className:"text-primary-600 text-3xl font-bold my-4 ml-1",children:t}),(0,i.jsx)("div",{className:(0,l.Z)({"bg-neutral-500/10 shadow-xl p-8":!a},"flex justify-center rounded-2xl",o?"backdrop-blur-md":""),children:r})]})}},71184:(e,t,a)=>{a.d(t,{Z:()=>r});a(67294);var l=a(53553),i=a(52263),s=a(85893);function r(e){let{children:t}=e;const{siteConfig:a}=(0,i.Z)();return(0,s.jsxs)(l.Z,{title:`${a.title} - Pushing the Limits of UAV Performance`,description:"Are you ready to fly?",children:[(0,s.jsx)("div",{className:"absolute w-full pointer-events-none -z-20 dark:brightness-50 dark:opacity-100 opacity-60",style:{WebkitMaskImage:"linear-gradient(transparent, black, transparent)"},children:(0,s.jsx)("img",{src:"img/betaflight/background.svg",alt:"Background"})}),(0,s.jsx)("div",{className:"absolute w-full -z-10 md:top-0",children:(0,s.jsxs)("svg",{className:"max-w-full h-fit",width:"100%",height:"1200",viewBox:"0 0 2700 1200",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,s.jsx)("g",{mask:"url(#mask0_1_8)",children:(0,s.jsx)("g",{filter:"url(#filter0_d_1_8)",children:(0,s.jsx)("path",{d:"M2700 2.38751C2448.27 2.38751 2371.37 353.391 2082.39 353.391C1742.09 353.391 1800.03 836.488 1409.59 792.37C1240.29 773.24 1022.42 1021.73 846.885 1021.73C686.747 1021.73 657.834 926.332 466.9 926.332C275.965 926.332 15.5274 1111.58 0 1200H2700V2.38751Z",className:"fill-[var(--ifm-background-color)]"})})}),(0,s.jsx)("defs",{children:(0,s.jsxs)("filter",{id:"filter0_d_1_8",x:"-270",y:"-1025.69",width:"3248.68",height:"3203.23",filterUnits:"userSpaceOnUse","color-interpolation-filters":"sRGB",children:[(0,s.jsx)("feFlood",{"flood-opacity":"0",result:"BackgroundImageFix"}),(0,s.jsx)("feColorMatrix",{in:"SourceAlpha",type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0",result:"hardAlpha"}),(0,s.jsx)("feOffset",{dx:"-70",dy:"-70"}),(0,s.jsx)("feGaussianBlur",{stdDeviation:"100"}),(0,s.jsx)("feComposite",{in2:"hardAlpha",operator:"out"}),(0,s.jsx)("feColorMatrix",{type:"matrix",values:"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"}),(0,s.jsx)("feBlend",{mode:"normal",in2:"BackgroundImageFix",result:"effect1_dropShadow_1_8"}),(0,s.jsx)("feBlend",{mode:"normal",in:"SourceGraphic",in2:"effect1_dropShadow_1_8",result:"shape"})]})})]})}),(0,s.jsx)("div",{className:"xl:max-w-[1920px] xl:m-auto flex flex-col items-center min-h-screen mt-16 w-full",children:t})]})}},27510:(e,t,a)=>{a.r(t),a.d(t,{default:()=>g});var l=a(67294),i=a(45942),s=a(71184),r=a(73074);const o={background:"transparent",text:{fontSize:16,fill:"#181818",outlineWidth:0,outlineColor:"transparent"},axis:{domain:{line:{stroke:"transparent"}},legend:{text:{fill:"#181818"}},ticks:{text:{fill:"#181818",fontSize:12}}},grid:{line:{stroke:"rgba(25, 25, 25, 0.1)",strokeWidth:1}},tooltip:{container:{background:"#2E2D2D"},chip:{}},legends:{text:{fill:"#181818",fontSize:12}}},n={background:"transparent",text:{fontSize:16,fill:"#ffffff",outlineWidth:0,outlineColor:"transparent"},axis:{domain:{line:{stroke:"transparent"}},legend:{text:{fill:"#ffffff"}},ticks:{text:{fill:"#ffffff",fontSize:12}}},grid:{line:{stroke:"rgba(255, 255, 255, 0.1)",strokeWidth:1}},tooltip:{container:{background:"#2E2D2D"},chip:{}},legends:{text:{fill:"#ffffff",fontSize:12}}};var d=a(92949),c=a(85893);async function x(){const e=await fetch("https://build.betaflight.com/api/stats").then((e=>e.json())),t=e.volumes.map((e=>({x:new Date(e.date).toLocaleDateString("en-GB",{day:"numeric",month:"short"}),y:e.cached+e.built}))),a=e.volumes[0].targets.map((t=>({id:t.name,data:e.volumes.map((e=>({x:new Date(e.date).toLocaleDateString("en-GB",{day:"numeric",month:"short"}),y:e.targets.find((e=>e.name===t.name))?.volume})))}))),l=e.volumes[0].releases.map((t=>({id:t.name,data:e.volumes.map((e=>({x:new Date(e.date).toLocaleDateString("en-GB",{day:"numeric",month:"short"}),y:e.releases.find((e=>e.name===t.name))?.volume})))})));return a.length=5,l.length=3,{total:t,targets:a,releases:l}}const m=e=>{let{point:t,children:a}=e;return(0,c.jsxs)("div",{className:"backdrop-blur-xl dark:bg-neutral-700/90 bg-neutral-200 h-fit p-2 rounded-full border-2 dark:border-neutral-500/50 border-neutral-300/50 shadow-xl z-10",children:[(0,c.jsx)("span",{style:{color:t.serieColor},className:"font-semibold",children:t.data.yFormatted}),a]})},f=e=>{let{data:t,maxY:a}=e;const l=(0,d.I)().isDarkTheme;return(0,c.jsx)("div",{className:"h-96 w-full flex",children:t?(0,c.jsx)(r.fH,{data:[{id:"Total",data:t.map((e=>({x:e.x,y:e.y})))}],theme:l?n:o,colors:["#FFBB00"],lineWidth:4,margin:{top:0,right:48,bottom:48,left:48},xScale:{type:"point"},yScale:{type:"linear",min:2e3,max:a+1e3,stacked:!0,reverse:!1},tooltip:e=>{let{point:t}=e;return(0,c.jsx)(m,{point:t,children:" Builds"})},areaBaselineValue:2e3,enableGridX:!1,enableGridY:!0,enableArea:!0,enableCrosshair:!1,curve:"natural",yFormat:" >-.0f",axisTop:null,axisRight:null,axisBottom:{tickSize:0,tickPadding:16,tickRotation:0},axisLeft:{tickSize:0,tickPadding:16,tickRotation:0},pointSize:10,pointColor:{from:"color",modifiers:[]},pointBorderWidth:2,pointBorderColor:{from:"serieColor"},pointLabelYOffset:-12,useMesh:!0}):(0,c.jsx)("div",{children:"Loading..."})})},h=()=>{const[e,t]=(0,l.useState)(null),[a,i]=(0,l.useState)(null);return(0,l.useEffect)((()=>{x().then((e=>{const a=e.total;if(a){const e=a.map((e=>e.y)),l=Math.max(...e);t(a),i(l)}}))}),[]),(0,c.jsx)(f,{data:e,maxY:a})},u=e=>{let{type:t,data:a,maxY:l}=e;const i=(0,d.I)().isDarkTheme;return(0,c.jsx)("div",{className:"h-96 w-full flex",children:a?(0,c.jsx)(r.fH,{data:a.map((e=>({id:e.id,data:e.data.map((e=>({x:e.x,y:e.y})))}))),theme:i?n:o,enableArea:!0,areaOpacity:.1,colors:["#5ad8e6","#87cc52","#ffcc00","#ff9742","#d6395b"],lineWidth:2,margin:{top:48,right:48,bottom:72,left:48},xScale:{type:"point"},yScale:{type:"linear",min:1,max:l+100,stacked:!1,reverse:!1},tooltip:e=>{let{point:t}=e;return(0,c.jsx)(m,{point:t,children:` ${t.serieId}`})},enableGridX:!1,enableGridY:!0,enableCrosshair:!1,curve:"natural",yFormat:" >-.0f",axisTop:null,axisRight:null,axisBottom:{tickSize:0,tickPadding:16,tickRotation:0},axisLeft:{tickSize:0,tickPadding:16,tickRotation:0},pointSize:6,pointColor:{from:"color",modifiers:[]},pointBorderWidth:2,pointBorderColor:{from:"serieColor"},pointLabelYOffset:-12,useMesh:!0,legends:[{anchor:"bottom",direction:"row",justify:!1,translateY:100,itemsSpacing:32,itemDirection:"top-to-bottom",itemWidth:96,itemHeight:64,symbolSize:10,symbolShape:"circle",symbolBorderColor:"rgba(0, 0, 0, .5)",effects:[{on:"hover",style:{itemBackground:"rgba(0, 0, 0, .03)",itemOpacity:1}}]}]}):(0,c.jsx)("div",{children:"Loading..."})})},p=e=>{let{type:t}=e;const[a,i]=(0,l.useState)(null),[s,r]=(0,l.useState)(null);return(0,l.useEffect)((()=>{x().then((e=>{let a=null,l=null;"releases"===t?(a=e.releases,l=Math.max(...e.releases.map((e=>Math.max(...e.data.map((e=>e.y))))))):"targets"===t&&(a=e.targets,l=Math.max(...e.targets.map((e=>Math.max(...e.data.map((e=>e.y))))))),i(a),r(l)}))}),[t]),(0,c.jsx)(u,{type:t,data:a,maxY:s})};function g(){return(0,c.jsxs)(s.Z,{children:[(0,c.jsx)("div",{className:"relative w-full mt-4 xl:mt-32",children:(0,c.jsx)("div",{className:"w-full h-fit flex flex-col justify-start",children:(0,c.jsxs)("div",{className:"flex flex-col p-6 h-fit w-fit xl:ml-12",children:[(0,c.jsx)("h1",{className:"md:text-[6rem] text-6xl border-primary-500 font-bold mb-4",children:"Stats"}),(0,c.jsx)("h2",{className:"text-white font-semibold md:text-3xl text-xl",children:"Cloud Build Statistics"})]})})}),(0,c.jsx)("div",{className:"xl:max-w-[1920px] w-full m-auto p-4 xl:p-16",children:(0,c.jsx)(i.Z,{title:"Stats",children:(0,c.jsxs)("div",{className:"flex flex-col w-full h-full",children:[(0,c.jsx)("h2",{className:"text-primary-600 text-3xl font-bold",children:"Total Builds"}),(0,c.jsx)(h,{}),(0,c.jsxs)("div",{className:"flex xl:flex-row flex-col mt-12",children:[(0,c.jsxs)("div",{className:"xl:w-1/2 w-full",children:[(0,c.jsx)("h2",{className:"text-primary-600 text-3xl font-bold",children:"Top 5 Targets"}),(0,c.jsx)(p,{type:"targets"})]}),(0,c.jsxs)("div",{className:"xl:w-1/2 w-full xl:mt-0 mt-12",children:[(0,c.jsx)("h2",{className:"text-primary-600 text-3xl font-bold",children:"Top 3 Releases"}),(0,c.jsx)(p,{type:"releases"})]})]})]})})})]})}}}]);