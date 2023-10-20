"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6241],{3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>u});var A=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var A=Object.getOwnPropertySymbols(e);t&&(A=A.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,A)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,A,a=function(e,t){if(null==e)return{};var n,A,a={},r=Object.keys(e);for(A=0;A<r.length;A++)n=r[A],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(A=0;A<r.length;A++)n=r[A],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var p=A.createContext({}),i=function(e){var t=A.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=i(e.components);return A.createElement(p.Provider,{value:t},e.children)},d="mdxType",g={inlineCode:"code",wrapper:function(e){var t=e.children;return A.createElement(A.Fragment,{},t)}},k=A.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,p=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=i(n),k=a,u=d["".concat(p,".").concat(k)]||d[k]||g[k]||r;return n?A.createElement(u,l(l({ref:t},c),{},{components:n})):A.createElement(u,l({ref:t},c))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,l=new Array(r);l[0]=k;var o={};for(var p in t)hasOwnProperty.call(t,p)&&(o[p]=t[p]);o.originalType=e,o[d]="string"==typeof e?e:a,l[1]=o;for(var i=2;i<r;i++)l[i]=n[i];return A.createElement.apply(null,l)}return A.createElement.apply(null,n)}k.displayName="MDXCreateElement"},24730:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>d,frontMatter:()=>r,metadata:()=>o,toc:()=>i});var A=n(87462),a=(n(67294),n(3905));const r={},l="Hardware debugging",o={unversionedId:"development/Hardware-Debugging",id:"development/Hardware-Debugging",title:"Hardware debugging",description:"The code can be compiled with debugging information, you can then upload a debug version to a board via a JLink/St-Link debug adapter and step through the code in your IDE.",source:"@site/docs/development/Hardware-Debugging.md",sourceDirName:"development",slug:"/development/Hardware-Debugging",permalink:"/docs/development/Hardware-Debugging",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"development",previous:{title:"Hardware Debugging In Eclipse",permalink:"/docs/development/Hardware-Debugging-in-Eclipse"},next:{title:"In-flight Adjustments",permalink:"/docs/development/Inflight-Adjustments"}},p={},i=[{value:"Hardware",id:"hardware",level:2},{value:"J-Link devices",id:"j-link-devices",level:3},{value:"Segger J-Link EDU EDU version, for hobbyists and educational use.",id:"segger-j-link-edu-edu-version-for-hobbyists-and-educational-use",level:4},{value:"USB-MiniJTAG J-Link JTAG/SWD Debugger/Emulator",id:"usb-minijtag-j-link-jtagswd-debuggeremulator",level:4},{value:"ARM-JTAG-20-10 adapter",id:"arm-jtag-20-10-adapter",level:5},{value:"CJMCU-STM32 Singlechip Development Board Jlink Downloader Jlink ARM Programmer",id:"cjmcu-stm32-singlechip-development-board-jlink-downloader-jlink-arm-programmer",level:4},{value:"STLink V2 devices",id:"stlink-v2-devices",level:3},{value:"CEPark STLink V2",id:"cepark-stlink-v2",level:4},{value:"Compilation options",id:"compilation-options",level:2},{value:"OSX",id:"osx",level:2},{value:"Install OpenOCD via Brew",id:"install-openocd-via-brew",level:3},{value:"GDB debug server",id:"gdb-debug-server",level:3},{value:"J-Link",id:"j-link",level:4},{value:"Windows",id:"windows",level:5},{value:"OpenOCD",id:"openocd",level:4},{value:"Windows",id:"windows-1",level:5},{value:"OSX/Linux",id:"osxlinux",level:5}],c={toc:i};function d(e){let{components:t,...r}=e;return(0,a.kt)("wrapper",(0,A.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"hardware-debugging"},"Hardware debugging"),(0,a.kt)("p",null,"The code can be compiled with debugging information, you can then upload a debug version to a board via a JLink/St-Link debug adapter and step through the code in your IDE."),(0,a.kt)("p",null,"More information about the necessary hardware and setting up the eclipse IDE can be found ",(0,a.kt)("a",{parentName:"p",href:"/docs/development/Hardware-Debugging-in-Eclipse"},"here")),(0,a.kt)("p",null,"A guide for visual studio can be found here:\n",(0,a.kt)("a",{parentName:"p",href:"http://visualgdb.com/tutorials/arm/st-link/"},"http://visualgdb.com/tutorials/arm/st-link/")),(0,a.kt)("p",null,"This video is also helpful in understanding the proces:\n",(0,a.kt)("a",{parentName:"p",href:"https://www.youtube.com/watch?v=kjvqySyNw20"},"https://www.youtube.com/watch?v=kjvqySyNw20")),(0,a.kt)("h2",{id:"hardware"},"Hardware"),(0,a.kt)("p",null,"Various debugging hardware solutions exist, the Segger J-Link clones are cheap and are known to work on Windows with both the Naze and Olimexino platforms."),(0,a.kt)("h3",{id:"j-link-devices"},"J-Link devices"),(0,a.kt)("p",null,"Segger make excellent debuggers and debug software."),(0,a.kt)("p",null,"The Segger J-Link GDB server can be obtained from here."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"http://www.segger.com/jlink-software.html"},"http://www.segger.com/jlink-software.html")),(0,a.kt)("h4",{id:"segger-j-link-edu-edu-version-for-hobbyists-and-educational-use"},"Segger J-Link EDU EDU version, for hobbyists and educational use."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"Segger J-Link EDU",src:n(9372).Z,width:"260",height:"284"})),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://www.segger.com/j-link-edu.html"},"https://www.segger.com/j-link-edu.html")),(0,a.kt)("h4",{id:"usb-minijtag-j-link-jtagswd-debuggeremulator"},"USB-MiniJTAG J-Link JTAG/SWD Debugger/Emulator"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"http://www.hotmcu.com/usbminijtag-jlink-jtagswd-debuggeremula%E2%80%8Btor-p-29.html?cPath=3_25&zenid=fdefvpnod186umrhsek225dc10"},"http://www.hotmcu.com/usbminijtag-jlink-jtagswd-debuggeremula%E2%80%8Btor-p-29.html?cPath=3_25&zenid=fdefvpnod186umrhsek225dc10")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"THAOYU USB-MiniJTAG",src:n(67180).Z,width:"800",height:"600"})),(0,a.kt)("h5",{id:"arm-jtag-20-10-adapter"},"ARM-JTAG-20-10 adapter"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://www.olimex.com/Products/ARM/JTAG/ARM-JTAG-20-10/"},"https://www.olimex.com/Products/ARM/JTAG/ARM-JTAG-20-10/"),"\n",(0,a.kt)("a",{parentName:"p",href:"http://uk.farnell.com/jsp/search/productdetail.jsp?sku=2144328"},"http://uk.farnell.com/jsp/search/productdetail.jsp?sku=2144328")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"OLIMEX ARM JTAG ADAPTER",src:n(89255).Z,width:"117",height:"200"})),(0,a.kt)("h4",{id:"cjmcu-stm32-singlechip-development-board-jlink-downloader-jlink-arm-programmer"},"CJMCU-STM32 Singlechip Development Board Jlink Downloader Jlink ARM Programmer"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"CJMCU-STM32 Jlink ARM Programmer Front",src:n(59655).Z,width:"140",height:"140"})),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"CJMCU-STM32 Jlink ARM Programmer Back",src:n(81883).Z,width:"140",height:"140"})),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"http://www.goodluckbuy.com/cjmcu-stm32-singlechip-development-board-jlink-downloader-jlink-arm-programmer.html"},"http://www.goodluckbuy.com/cjmcu-stm32-singlechip-development-board-jlink-downloader-jlink-arm-programmer.html")),(0,a.kt)("h3",{id:"stlink-v2-devices"},"STLink V2 devices"),(0,a.kt)("p",null,"STLink V2 devices can be used too, via OpenOCD."),(0,a.kt)("h4",{id:"cepark-stlink-v2"},"CEPark STLink V2"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"CEPark STLink V2",src:n(16361).Z,width:"140",height:"140"})),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"http://www.goodluckbuy.com/cepark-stlink-st-link-v2-emulator-programmer-stm8-stm32-downloader.html"},"http://www.goodluckbuy.com/cepark-stlink-st-link-v2-emulator-programmer-stm8-stm32-downloader.html")),(0,a.kt)("h2",{id:"compilation-options"},"Compilation options"),(0,a.kt)("p",null,"use ",(0,a.kt)("inlineCode",{parentName:"p"},"DEBUG=GDB")," make argument."),(0,a.kt)("p",null,"You may find that if you compile all the files with debug information on that the program is too big to fit on the target device. If this happens you have some options:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Compile all files without debug information (",(0,a.kt)("inlineCode",{parentName:"li"},"make clean"),", ",(0,a.kt)("inlineCode",{parentName:"li"},"make ..."),"), then re-save or ",(0,a.kt)("inlineCode",{parentName:"li"},"touch")," the files you want to be able to step though and then run ",(0,a.kt)("inlineCode",{parentName:"li"},"make DEBUG=GDB"),". This will then re-compile the files you're interested in debugging with debugging symbols and you will get a smaller binary file which should then fit on the device."),(0,a.kt)("li",{parentName:"ul"},"You could use a development board such as an PORT103R, development boards often have more flash rom.")),(0,a.kt)("h2",{id:"osx"},"OSX"),(0,a.kt)("h3",{id:"install-openocd-via-brew"},"Install OpenOCD via Brew"),(0,a.kt)("p",null,'ruby -e "$(curl -fsSL ',(0,a.kt)("a",{parentName:"p",href:"https://raw.githubusercontent.com/Homebrew/install/master/install)%22"},'https://raw.githubusercontent.com/Homebrew/install/master/install)"')),(0,a.kt)("p",null,"brew install openocd"),(0,a.kt)("h3",{id:"gdb-debug-server"},"GDB debug server"),(0,a.kt)("h4",{id:"j-link"},"J-Link"),(0,a.kt)("h5",{id:"windows"},"Windows"),(0,a.kt)("p",null,"Run the Launch the J-Link GDB Server program and configure using UI."),(0,a.kt)("h4",{id:"openocd"},"OpenOCD"),(0,a.kt)("h5",{id:"windows-1"},"Windows"),(0,a.kt)("p",null,"STM32F103 targets"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'"C:\\Program Files (x86)\\UTILS\\openocd-0.8.0\\bin-x64\\openocd-x64-0.8.0.exe" -f interface/stlink-v2.cfg -f target/stm32f1x_stlink.cfg\n')),(0,a.kt)("p",null,"STM32F30x targets"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},'"C:\\Program Files (x86)\\UTILS\\openocd-0.8.0\\bin-x64\\openocd-x64-0.8.0.exe" -f scripts\\board\\stm32f3discovery.cfg\n')),(0,a.kt)("h5",{id:"osxlinux"},"OSX/Linux"),(0,a.kt)("p",null,"STM32F30x targets"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"  openocd -f /usr/share/openocd/scripts/board/stm32vldiscovery.cfg\n")))}d.isMDXComponent=!0},89255:(e,t,n)=>{n.d(t,{Z:()=>A});const A="data:image/jpeg;base64,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"},67180:(e,t,n)=>{n.d(t,{Z:()=>A});const A=n.p+"assets/images/THAOYU-USB-MiniJTAG-791edb4ffb611f0f501481fd6c27dc93.jpg"},16361:(e,t,n)=>{n.d(t,{Z:()=>A});const A="data:image/jpeg;base64,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"},81883:(e,t,n)=>{n.d(t,{Z:()=>A});const A="data:image/jpeg;base64,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"},59655:(e,t,n)=>{n.d(t,{Z:()=>A});const A="data:image/jpeg;base64,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"},9372:(e,t,n)=>{n.d(t,{Z:()=>A});const A=n.p+"assets/images/j-link-edu-6772a01efa453ae383e03b108b91f6c4.jpg"}}]);