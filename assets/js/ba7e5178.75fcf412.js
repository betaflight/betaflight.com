"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[542],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>h});var i=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,i,a=function(e,t){if(null==e)return{};var n,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=i.createContext({}),p=function(e){var t=i.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},u=function(e){var t=p(e.components);return i.createElement(s.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},c=i.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(n),c=a,h=d["".concat(s,".").concat(c)]||d[c]||m[c]||o;return n?i.createElement(h,r(r({ref:t},u),{},{components:n})):i.createElement(h,r({ref:t},u))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,r=new Array(o);r[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:a,r[1]=l;for(var p=2;p<o;p++)r[p]=n[p];return i.createElement.apply(null,r)}return i.createElement.apply(null,n)}c.displayName="MDXCreateElement"},9858:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var i=n(87462),a=(n(67294),n(3905));const o={},r=void 0,l={unversionedId:"Archive/TBS-Unify-Smartaudio",id:"Archive/TBS-Unify-Smartaudio",title:"TBS-Unify-Smartaudio",description:"What's new",source:"@site/docs/Archive/TBS-Unify-Smartaudio.md",sourceDirName:"Archive",slug:"/Archive/TBS-Unify-Smartaudio",permalink:"/docs/Archive/TBS-Unify-Smartaudio",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/docs/Archive/Supported-Sensors"},next:{title:"Telemetry",permalink:"/docs/Archive/Telemetry"}},s={},p=[{value:"What&#39;s new",id:"whats-new",level:2},{value:"TBS SmartAudio",id:"tbs-smartaudio",level:4},{value:"Setup",id:"setup",level:2},{value:"From teralift&#39;s post in Boris&#39; thread (modified a bit)",id:"from-teralifts-post-in-boris-thread-modified-a-bit",level:4},{value:"From AILERON8&#39;s post in Boris&#39; thread:",id:"from-aileron8s-post-in-boris-thread",level:4},{value:"Here is a tutorial by Amano13:",id:"here-is-a-tutorial-by-amano13",level:4},{value:"From Boris:",id:"from-boris",level:4},{value:"User&#39;s Responsibility",id:"users-responsibility",level:2},{value:"Compatibility",id:"compatibility",level:2},{value:"SmartAudio CMS guide",id:"smartaudio-cms-guide",level:2},{value:"The top menu (Band/Channel mode)",id:"the-top-menu-bandchannel-mode",level:3},{value:"Status Line",id:"status-line",level:3},{value:"Operational Models",id:"operational-models",level:3},{value:"Race",id:"race",level:4},{value:"Freestyle",id:"freestyle",level:4},{value:"Switching between Freestyle and Race",id:"switching-between-freestyle-and-race",level:4},{value:"The top menu (Band/Channel mode)",id:"the-top-menu-bandchannel-mode-1",level:3},{value:"Switching between band/channel mode and user frequency mode",id:"switching-between-bandchannel-mode-and-user-frequency-mode",level:4},{value:"CONFIG sub-menu",id:"config-sub-menu",level:3},{value:"OP MODEL",id:"op-model",level:4},{value:"FSEL MODE",id:"fsel-mode",level:4},{value:"PIT FMODE",id:"pit-fmode",level:4},{value:"POR FREQ",id:"por-freq",level:4},{value:"STATX",id:"statx",level:4},{value:"Trouble shooting",id:"trouble-shooting",level:3},{value:"Recovery from accidental Out-Range pit mode",id:"recovery-from-accidental-out-range-pit-mode",level:4},{value:"Modify VTX Settings (TBS Unify / TrampHV) using Spektrum VTX Setup Menu",id:"modify-vtx-settings-tbs-unify--tramphv-using-spektrum-vtx-setup-menu",level:2},{value:"Modify VTX Settings (TBS Unify / TrampHV) using FrSky TARANIS Menu",id:"modify-vtx-settings-tbs-unify--tramphv-using-frsky-taranis-menu",level:2},{value:"Taranis upgrading and setup",id:"taranis-upgrading-and-setup",level:3},{value:"Modify VTX Configuration (TBS Unify / TrampHV) using CLI Settings",id:"modify-vtx-configuration-tbs-unify--tramphv-using-cli-settings",level:2},{value:"Using both SmartAudio and microphone at the same time",id:"using-both-smartaudio-and-microphone-at-the-same-time",level:2},{value:"General concept of wiring",id:"general-concept-of-wiring",level:4},{value:"Ideal connection:",id:"ideal-connection",level:4},{value:"These two configurations might work as well depending on how it is used and connected:",id:"these-two-configurations-might-work-as-well-depending-on-how-it-is-used-and-connected",level:4}],u={toc:p};function d(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,i.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"whats-new"},"What's new"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"2017-02-12 Note on compatibility of SmartAudio V1 devices (Compatibility section)"),(0,a.kt)("li",{parentName:"ul"},"2018-07-19 Note on operational mode switching"),(0,a.kt)("li",{parentName:"ul"},"2020-07-25 Updated targets, removed broken link. Added link to latest revision of TBS SmartAudio documentation")),(0,a.kt)("h4",{id:"tbs-smartaudio"},"TBS SmartAudio"),(0,a.kt)("p",null,"Latest manual: ",(0,a.kt)("a",{parentName:"p",href:"https://www.team-blacksheep.com/tbs_smartaudio_rev09.pdf"},"https://www.team-blacksheep.com/tbs_smartaudio_rev09.pdf")),(0,a.kt)("h2",{id:"setup"},"Setup"),(0,a.kt)("h4",{id:"from-teralifts-post-in-boris-thread-modified-a-bit"},"From teralift's post in Boris' thread (modified a bit)"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Targets\nTBS SmartAudio is supported on all F3, F4, F7 and H7 targets (except for those with integrated VTX).")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Wiring\nJust wire the SmartAudio wire to a free TX port, hardware UART or software serial.\nFor software serial, be careful that your port may not be labelled TX, or port labelled TX may not work. (It can be freely assigned to valid timer port.)\n(There are some compatibility issues reported; if you have any problems, search the net before going into the BF github repo and cry for help.)")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Configuration\nThe up to date configurator supports easy configuration of the SmartAudio on the selected port."))),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Goto Ports tab"),(0,a.kt)("li",{parentName:"ol"},"Select TBS SmartAudio from Peripherals drop down menu"),(0,a.kt)("li",{parentName:"ol"},"Speed can be left at AUTO.")),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://cloud.githubusercontent.com/assets/14850998/22005655/804c7c26-dca8-11e6-80b4-3c67765dc0e3.png",alt:"Enabling SmartPort in Peripherals"})),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Generic CMS\n3.1 will come with the generic CMS (Configuration Menu System) that runs on top of multiple display devices; FC-integrated OSD, I2C OLED display and external OSD (MinimOSD variants) running latest version of MWOSD (Release 1.6.5 or later).\n(You even can switch between OSD and OLED while in CMS.)\nThis means that users of external OSDs can control SmartAudio from the CMS.")),(0,a.kt)("h4",{id:"from-aileron8s-post-in-boris-thread"},"From AILERON8's post in Boris' thread:"),(0,a.kt)("p",null,"There is a little info on smartaudio setup in here, but you may need to do a bit of troubleshooting to make it work for your particular setup. Good luck! I look forward to setting up SmartAudio on my next BFF3 quad myself."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://github.com/betaflight/betaflight/issues/1029"},"https://github.com/betaflight/betaflight/issues/1029")),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"http://team-blacksheep.com/tbs-unify-pro-5g8-manual.pdf"},"http://team-blacksheep.com/tbs-unify-pro-5g8-manual.pdf")),(0,a.kt)("h4",{id:"here-is-a-tutorial-by-amano13"},"Here is a tutorial by Amano13:"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://tmr.kiwi/betaflight-mwosd-smartaudio-cms/"},"https://tmr.kiwi/betaflight-mwosd-smartaudio-cms/")),(0,a.kt)("h4",{id:"from-boris"},"From Boris:"),(0,a.kt)("p",null,"The easiest is of course to get fc with OSD. That works absolutely flawless, but\nthere is a separate betaflight repository with LUA scripts\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/betaflight/betaflight-tx-lua-scripts"},"https://github.com/betaflight/betaflight-tx-lua-scripts")),(0,a.kt)("p",null,"I am thinking to add more howto videos to github locations. So those who are willing to make nice howto videos please post it in here."),(0,a.kt)("h2",{id:"users-responsibility"},"User's Responsibility"),(0,a.kt)("p",null,"The SmartAudio support unlocks certain capabilities of a SmartAudio device, to provide users with maximum flexibility. Therefore, it is user's responsibility to operate the device within the limits of respective local regulations."),(0,a.kt)("h2",{id:"compatibility"},"Compatibility"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Both SmartAudio V1, V2 and newer devices are supported.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"The SmartAudio V1 is NOT compatible with ",(0,a.kt)("em",{parentName:"p"},"some")," hardware UARTs (as of 2017-02-12). If you have trouble with V1 devices with hardware UARTs, please try the software serial (available in v3.1.6 patch release or later).")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"Unify 5G8 Pro Race Edition:\nLower frequencies are not supported.\nPower setting can be selected as 500 or 800, but will only go up to 200, as will be indicated on the status line.")),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("p",{parentName:"li"},"SPARKY2:\nDue to the pull-up resistors, Flexi-port is not suitable for Unify 5G8 Pro, Pro HV and Pro HV Race edition.\nMain-port may be compatible (need testing)."))),(0,a.kt)("h2",{id:"smartaudio-cms-guide"},"SmartAudio CMS guide"),(0,a.kt)("h3",{id:"the-top-menu-bandchannel-mode"},"The top menu (Band/Channel mode)"),(0,a.kt)("p",null,"The top menu for SmartAudio VTX in band/channel mode looks like this.\n",(0,a.kt)("img",{parentName:"p",src:"https://cloud.githubusercontent.com/assets/14850998/21961195/c2639562-db46-11e6-9f98-71d54f6a879b.jpg",alt:"SmartAudio CMS Top menu (Band/Chan mode)"}),"\nWhile most of the entries are intuitive, there are several things that need additional explanation."),(0,a.kt)("h3",{id:"status-line"},"Status Line"),(0,a.kt)("p",null,"The status line on the top menu page of SmartAudio VTX menu indicates current status of the vtx in the following format:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"m bc ffff ppp\n")),(0,a.kt)("p",null,"where"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"m")," : Operational model, ",(0,a.kt)("inlineCode",{parentName:"p"},"F")," (Freestyle) or ",(0,a.kt)("inlineCode",{parentName:"p"},"R")," (Race)."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"b")," : Current transmitting band, ",(0,a.kt)("inlineCode",{parentName:"p"},"A")," (BOSCAM A), ",(0,a.kt)("inlineCode",{parentName:"p"},"B")," (BOSCAM B), ",(0,a.kt)("inlineCode",{parentName:"p"},"E")," (BOSCAM E), ",(0,a.kt)("inlineCode",{parentName:"p"},"F")," (FatShark/NexWave) or 'R' (Raceband)."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"c")," : Current transmitting channel, ",(0,a.kt)("inlineCode",{parentName:"p"},"1")," through ",(0,a.kt)("inlineCode",{parentName:"p"},"8"),"."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"ffff"),": Current transmitting frequency."),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"ppp"),": Current transmitting RF power, numeric value for mW (",(0,a.kt)("inlineCode",{parentName:"p"},"25"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"200"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"500"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"800"),"), or ",(0,a.kt)("inlineCode",{parentName:"p"},"PIR")," (In-Range Pit mode) or ",(0,a.kt)("inlineCode",{parentName:"p"},"POR")," (Out-Range Pit mode)."),(0,a.kt)("p",null,'Note that the status line indicates "running" status of the VTX device, and values may be different from band, channel and power setting entries below the status line.'),(0,a.kt)("h3",{id:"operational-models"},"Operational Models"),(0,a.kt)("p",null,"In Betaflight, a SmartAudio device operates in one of two operational models:"),(0,a.kt)("h4",{id:"race"},"Race"),(0,a.kt)("p",null,"This is a model that gives minimum interferance to other pilots.\nA SmartAudio device powers up in pit mode, and remain in pit mode until transmission is commenced."),(0,a.kt)("p",null,"When operating in this model, left most character of the status line is ",(0,a.kt)("inlineCode",{parentName:"p"},"R"),".\nIf the device is in pit mode, current power field of the status line is either ",(0,a.kt)("inlineCode",{parentName:"p"},"PIR")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"POR"),", until transmission is commenced."),(0,a.kt)("p",null,"While in the pit mode, changes to ",(0,a.kt)("inlineCode",{parentName:"p"},"BAND"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"CHAN")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"POWER")," will not take effect until ",(0,a.kt)("inlineCode",{parentName:"p"},"SET")," menu entry and associated confirmation is done (transmission commencing).\n",(0,a.kt)("inlineCode",{parentName:"p"},"BAND"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"CHAN")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"POWER")," can be modified after commencing, but they all still require ",(0,a.kt)("inlineCode",{parentName:"p"},"SET")," to take effect."),(0,a.kt)("p",null,'Refer to TBS Unify 5G8 Pro Manual for explanation of "In-Range" and "Out-Range".'),(0,a.kt)("h4",{id:"freestyle"},"Freestyle"),(0,a.kt)("p",null,"This is a model used when flying alone. A SmartAudio device will power up actively transmitting at band and channel with power as they were set before the power cycle.\nWhen operating in this model, left most character of the status line is ",(0,a.kt)("inlineCode",{parentName:"p"},"F"),",\nand current power field matches that of power level selection menu entry.\nChanges to ",(0,a.kt)("inlineCode",{parentName:"p"},"POWER")," takes effect immediately, but changes to ",(0,a.kt)("inlineCode",{parentName:"p"},"BAND")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"CHAN")," must be commenced by ",(0,a.kt)("inlineCode",{parentName:"p"},"SET"),"."),(0,a.kt)("h4",{id:"switching-between-freestyle-and-race"},"Switching between Freestyle and Race"),(0,a.kt)("p",null,"There is an ",(0,a.kt)("inlineCode",{parentName:"p"},"OPMODEL")," entry in the ",(0,a.kt)("inlineCode",{parentName:"p"},"CONFIG")," sub-menu. Select either ",(0,a.kt)("inlineCode",{parentName:"p"},"FREE")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"RACE"),". A device must be power cycled immediately after the selection for the change to take effect."),(0,a.kt)("h3",{id:"the-top-menu-bandchannel-mode-1"},"The top menu (Band/Channel mode)"),(0,a.kt)("p",null,"When a SmartAudio device is in user frequency mode, the SmartAudio CMS Top Menu looks like this.\n",(0,a.kt)("img",{parentName:"p",src:"https://cloud.githubusercontent.com/assets/14850998/22690953/7ac836ee-ed7b-11e6-8c71-139f1eb919aa.png",alt:"SmartAudio CMS Top menu (Frequency mode)"}),"\nIt allows direct entry of arbitral frequency between 5600 and 5900MHz, by selecting the ",(0,a.kt)("inlineCode",{parentName:"p"},"FREQ")," entry, which will take to a submenu like this."),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://cloud.githubusercontent.com/assets/14850998/22690983/a8db502a-ed7b-11e6-9570-e2f406f5d29b.png",alt:"SmartAudio Frequency selection menu"})),(0,a.kt)("p",null,"The ",(0,a.kt)("inlineCode",{parentName:"p"},"NEW FREQ")," allows selection of a new frequency, and ",(0,a.kt)("inlineCode",{parentName:"p"},"SET")," will commence the transmission at the frequency. Accelerating auto repeat can be used here to prevent you from grounded when making a large change."),(0,a.kt)("h4",{id:"switching-between-bandchannel-mode-and-user-frequency-mode"},"Switching between band/channel mode and user frequency mode"),(0,a.kt)("p",null,"To switch from band/channel to user frequency mode:"),(0,a.kt)("p",null,"(1) Navigate to ",(0,a.kt)("inlineCode",{parentName:"p"},"SA CONFIG")," menu."),(0,a.kt)("p",null,"(2) Change ",(0,a.kt)("inlineCode",{parentName:"p"},"OP MODEL")," to ",(0,a.kt)("inlineCode",{parentName:"p"},"FREE")," if not already ",(0,a.kt)("inlineCode",{parentName:"p"},"FREE"),"."),(0,a.kt)("p",null,"(4) Power cycle the SmartAudio device (You don't have to power cycle the FC)."),(0,a.kt)("p",null,"(5) Navigate back to SmartAudio VTX top menu."),(0,a.kt)("p",null,"To switch from user frequency mode to band/channel mode:"),(0,a.kt)("p",null,"(1) Navigate to ",(0,a.kt)("inlineCode",{parentName:"p"},"SA CONFIG")," menu."),(0,a.kt)("p",null,"(2) Change ",(0,a.kt)("inlineCode",{parentName:"p"},"FSEL MODE")," to ",(0,a.kt)("inlineCode",{parentName:"p"},"CHAN"),"."),(0,a.kt)("p",null,"(3) Power cycle the SmartAudio device (You don't have to power cycle the FC)."),(0,a.kt)("p",null,"(4) Navigate back to SmartAudio VTX top menu."),(0,a.kt)("h3",{id:"config-sub-menu"},"CONFIG sub-menu"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://cloud.githubusercontent.com/assets/14850998/21961345/de0b760a-db4a-11e6-8309-abc6227ddc7c.jpg",alt:"SmartAudio CMS CONFIG submenu"})),(0,a.kt)("h4",{id:"op-model"},"OP MODEL"),(0,a.kt)("p",null,"Selection between race operational model (",(0,a.kt)("inlineCode",{parentName:"p"},"RACE"),") and freestyle operational model (",(0,a.kt)("inlineCode",{parentName:"p"},"FREE"),").\nRequires power cycle to take effect."),(0,a.kt)("p",null,"When race operational model is selected, the frequency selection mode (",(0,a.kt)("inlineCode",{parentName:"p"},"FSEL MODE"),") will automatically set to ",(0,a.kt)("inlineCode",{parentName:"p"},"CHAN"),". This is by the specification of the current hardware (Unify 5G8 Pro/Pro HV/Race)."),(0,a.kt)("h4",{id:"fsel-mode"},"FSEL MODE"),(0,a.kt)("p",null,"Frequency selection method. Requires power cycle to take effect."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Channel mode ('CHAN'): Frequency is selected by specifying band and channel."),(0,a.kt)("li",{parentName:"ul"},"Frequency mode ('FREQ'): Frequency is specified by numerical value in MHz.\nWhen set to frequency mode, operational model is automatically set to freestyle, and top menu will be altered to enable direct frequency adjustment.")),(0,a.kt)("p",null,"The Frequency mode (",(0,a.kt)("inlineCode",{parentName:"p"},"FREQ"),") is only available when the operational model is freestyle (",(0,a.kt)("inlineCode",{parentName:"p"},"FREE"),"). To choose the frequency mode, first switch the operational model to free style."),(0,a.kt)("h4",{id:"pit-fmode"},"PIT FMODE"),(0,a.kt)("p",null,"Specifies frequency to use while in pit mode. Requires power cycle to take effect."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"In-Range (",(0,a.kt)("inlineCode",{parentName:"li"},"PIR"),"): Pit mode frequency is specified by band and channel set before the power cycle."),(0,a.kt)("li",{parentName:"ul"},"Out-Range (",(0,a.kt)("inlineCode",{parentName:"li"},"POR"),"): Pit mode frequency is specified by the value of ",(0,a.kt)("inlineCode",{parentName:"li"},"POR FREQ"),".")),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},(0,a.kt)("em",{parentName:"em"},"WARNING")),"\nDo not change this entry to POR without VRX capable of receiving at frequency specified by the ",(0,a.kt)("inlineCode",{parentName:"p"},"POR FREQ")," entry.\nIf you do without such VRX, you will be blinded until Out-Range pit mode is cleared."),(0,a.kt)("h4",{id:"por-freq"},"POR FREQ"),(0,a.kt)("p",null,"Specifies frequency to use while in ",(0,a.kt)("em",{parentName:"p"},"Out-Range")," pit mode."),(0,a.kt)("h4",{id:"statx"},"STATX"),(0,a.kt)("p",null,"Protocol statistics between a flight controller and a SmartAudio device. May help you to trouble shoot connection problems."),(0,a.kt)("h3",{id:"trouble-shooting"},"Trouble shooting"),(0,a.kt)("h4",{id:"recovery-from-accidental-out-range-pit-mode"},"Recovery from accidental Out-Range pit mode"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"You can cancel pit mode by button operation. Refer to the Unify manual."),(0,a.kt)("li",{parentName:"ul"},"You can use alternative CMS device such as I2C OLED to cancel the Out-Range mode."),(0,a.kt)("li",{parentName:"ul"},"You can tap or connect VIDEO OUTPUT from OSD and connect it to external display or goggle's VIDEO INPUT.")),(0,a.kt)("h2",{id:"modify-vtx-settings-tbs-unify--tramphv-using-spektrum-vtx-setup-menu"},"Modify VTX Settings (TBS Unify / TrampHV) using Spektrum VTX Setup Menu"),(0,a.kt)("p",null,"Please read the Spektrum VTX setup section on the IRC Tramp WiKi page:\nIRC-Tramp#modify-vtx-settings-tbs-unify--tramp-hv--rtc6705--using-spektrum-vtx-setup-menu"),(0,a.kt)("h2",{id:"modify-vtx-settings-tbs-unify--tramphv-using-frsky-taranis-menu"},"Modify VTX Settings (TBS Unify / TrampHV) using FrSky TARANIS Menu"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"http://www.nitbeatfpv.com/tramphv-unify-vtx-settings-taranis"},"http://www.nitbeatfpv.com/tramphv-unify-vtx-settings-taranis")),(0,a.kt)("p",null,"Note: The bf script linked in this 'how to' link isn't the latest one. You need the one linked here.\n",(0,a.kt)("a",{parentName:"p",href:"https://github.com/betaflight/betaflight-tx-lua-scripts"},"https://github.com/betaflight/betaflight-tx-lua-scripts")),(0,a.kt)("h3",{id:"taranis-upgrading-and-setup"},"Taranis upgrading and setup"),(0,a.kt)("p",null,"Originally Posted by elmattbo:\nEnsure opentx 2.2 on the radio and avoid rc11. If upgrading from 2.1 you will have to copy in the new file structure for 2.2 to the sd card - back your sd card up first.\nThe early bf 3.1 releases do have SmartAudio selectable in the ports tab but don't necessarily work, so update to the latest bf.\nInstall the lua scripts linked from the bf wiki (x7, x9 as appropriate) into the scripts folder on the Taranis sd card.\nAttach the vtx audio lead to either uart 1 or 3 tx pin (RG SSD FC - Connect to the UART available on the FC you use).\nSelect tbs SmartAudio for the appropriate UART in the ports tab.\nGo to display in the Taranis and set a screen to 'scripts' it should then offer you the lua script you installed earlier.\nFrom the main model screen a long press of page will bring up the bf scripts and you press menu to cycle to the vtx screen.\nUpdate from elmattbo:\nSo after trying it today I found that the vtx didn't respond to changes in the lua script. Tried a power reboot after changing settings but it made no difference. I suspect I'm missing something in the set up, but it could be that the taranis reads the vtx, but doesn't write any changes. I have read that the half wave duplex (or whatever it is) communications protocol took a little figuring out for the devs so the issue may be in betaflight too."),(0,a.kt)("p",null,'Fixed! I hadn\'t saved the settings with a long press of the Taranis menu.\nChange VTX Settings\nStore or Reload values - Long Press MENU button\nSwitch screens - Short Press MENU button\nNavigate between values - "+" & "-" buttons\nEDIT value - Press ENTER'),(0,a.kt)("h2",{id:"modify-vtx-configuration-tbs-unify--tramphv-using-cli-settings"},"Modify VTX Configuration (TBS Unify / TrampHV) using CLI Settings"),(0,a.kt)("p",null,"As of Betaflight version 3.3.0, CLI settings to modify the VTX configuration are supported. See the ",(0,a.kt)("a",{parentName:"p",href:"VTX-CLI-Settings"},"VTX CLI Settings")," page for more information."),(0,a.kt)("h2",{id:"using-both-smartaudio-and-microphone-at-the-same-time"},"Using both SmartAudio and microphone at the same time"),(0,a.kt)("h4",{id:"general-concept-of-wiring"},"General concept of wiring"),(0,a.kt)("p",null,"The digital signal can be connected either directly or using a Resistor."),(0,a.kt)("p",null,"If it comes from a microcontroller with 3.3V, best solution is to use a voltage divider to ~0.9V for a proper audio level (4k7 and 1k8 resistor values in our case)."),(0,a.kt)("p",null,"The analog signal needs to be ac coupled using a series capacitor from audio source to the smart audio signal. Ideal capacitance is around 100nF."),(0,a.kt)("p",null,"(The click sound in your audio will disappear after arming)"),(0,a.kt)("h4",{id:"ideal-connection"},"Ideal connection:"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/4037455969/original/GsQVQvCDbXk1zf8WJPaz9NLTZu1eNrbL3g?1490626337",alt:null})),(0,a.kt)("h4",{id:"these-two-configurations-might-work-as-well-depending-on-how-it-is-used-and-connected"},"These two configurations might work as well depending on how it is used and connected:"),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/4037456019/original/SWkM-JY1Fsh8h8loM_yMxBJCPFVLSd0bsw?1490626407",alt:null})),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://s3.amazonaws.com/cdn.freshdesk.com/data/helpdesk/attachments/production/4037456045/original/zsjw2bevK6FMWT_pgGseUckoLviUUONOjg?1490626445",alt:null})))}d.isMDXComponent=!0}}]);