"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2173],{3905:(e,t,a)=>{a.d(t,{Zo:()=>d,kt:()=>u});var n=a(67294);function i(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){i(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function r(e,t){if(null==e)return{};var a,n,i=function(e,t){if(null==e)return{};var a,n,i={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(i[a]=e[a])}return i}var s=n.createContext({}),f=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},d=function(e){var t=f(e.components);return n.createElement(s.Provider,{value:t},e.children)},p="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,i=e.mdxType,l=e.originalType,s=e.parentName,d=r(e,["components","mdxType","originalType","parentName"]),p=f(a),m=i,u=p["".concat(s,".").concat(m)]||p[m]||c[m]||l;return a?n.createElement(u,o(o({ref:t},d),{},{components:a})):n.createElement(u,o({ref:t},d))}));function u(e,t){var a=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var l=a.length,o=new Array(l);o[0]=m;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r[p]="string"==typeof e?e:i,o[1]=r;for(var f=2;f<l;f++)o[f]=a[f];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},62401:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>p,frontMatter:()=>l,metadata:()=>r,toc:()=>f});var n=a(87462),i=(a(67294),a(3905));const l={},o="Failsafe",r={unversionedId:"development/Failsafe_before_4.3",id:"development/Failsafe_before_4.3",title:"Failsafe",description:"There are two types of failsafe:",source:"@site/docs/development/Failsafe_before_4.3.md",sourceDirName:"development",slug:"/development/Failsafe_before_4.3",permalink:"/docs/development/Failsafe_before_4.3",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"development",previous:{title:"Failsafe",permalink:"/docs/development/Failsafe"},next:{title:"The FrSky SPI RX",permalink:"/docs/development/FrSky SPI RX"}},s={},f=[{value:"Flight controller failsafe system",id:"flight-controller-failsafe-system",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Failsafe Settings",id:"failsafe-settings",level:2},{value:"<code>failsafe_delay</code>",id:"failsafe_delay",level:3},{value:"<code>failsafe_off_delay</code>",id:"failsafe_off_delay",level:3},{value:"<code>failsafe_throttle</code>",id:"failsafe_throttle",level:3},{value:"<code>failsafe_switch_mode</code>",id:"failsafe_switch_mode",level:3},{value:"<code>failsafe_throttle_low_delay</code>",id:"failsafe_throttle_low_delay",level:3},{value:"<code>failsafe_procedure</code>",id:"failsafe_procedure",level:3},{value:"<code>rx_min_usec</code>",id:"rx_min_usec",level:3},{value:"<code>rx_max_usec</code>",id:"rx_max_usec",level:3},{value:"Testing",id:"testing",level:2}],d={toc:f};function p(e){let{components:t,...a}=e;return(0,i.kt)("wrapper",(0,n.Z)({},d,a,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"failsafe"},"Failsafe"),(0,i.kt)("p",null,"There are two types of failsafe:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Receiver based failsafe"),(0,i.kt)("li",{parentName:"ol"},"Flight controller based failsafe")),(0,i.kt)("p",null,"Receiver based failsafe is where you, from your transmitter and receiver, configure channels to output desired signals if your receiver detects signal loss and goes to the ",(0,i.kt)("strong",{parentName:"p"},"failsafe mode"),". The idea is that you set throttle and other controls so the aircraft descends in a controlled manner. See your receiver's documentation for this method."),(0,i.kt)("p",null,"Flight controller based failsafe is where the flight controller attempts to detect signal loss and/or the ",(0,i.kt)("strong",{parentName:"p"},"failsafe mode")," of your receiver and upon detection goes to ",(0,i.kt)("strong",{parentName:"p"},"failsafe stage 1"),". The idea is that the flight controller starts using ",(0,i.kt)("strong",{parentName:"p"},"fallback settings")," for all controls, which are set by you, using the CLI command ",(0,i.kt)("inlineCode",{parentName:"p"},"rxfail")," (see ",(0,i.kt)("a",{parentName:"p",href:"/docs/development/Rx#rx-loss-configuration"},"rxfail")," section in rx documentation) or the cleanflight-configurator GUI."),(0,i.kt)("p",null,"It is possible to use both types at the same time, which may be desirable. Flight controller failsafe can even help if your receiver signal wires come loose, get damaged or your receiver malfunctions in a way the receiver itself cannot detect."),(0,i.kt)("p",null,"Alternatively you may configure a transmitter switch to activate failsafe mode. This is useful for fieldtesting the failsafe system and as a ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},(0,i.kt)("inlineCode",{parentName:"em"},"PANIC")))," switch when you lose orientation."),(0,i.kt)("h2",{id:"flight-controller-failsafe-system"},"Flight controller failsafe system"),(0,i.kt)("p",null,"This system has two stages."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Stage 1")," is entered when ",(0,i.kt)("strong",{parentName:"p"},"a flightchannel")," has an ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"invalid pulse length")),", the receiver reports ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"failsafe mode"))," or there is ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"no signal"))," from the receiver. Fallback settings are applied to ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"all channels"))," and a short amount of time is provided to allow for recovery."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Note:")," Prior to entering ",(0,i.kt)("strong",{parentName:"p"},"stage 1"),", fallback settings are also applied to ",(0,i.kt)("strong",{parentName:"p"},(0,i.kt)("em",{parentName:"strong"},"individual AUX channels"))," that have invalid pulses."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Stage 1")," can also directly be activated when a transmitter switch that is configured to control the failsafe mode is switched ON and ",(0,i.kt)("inlineCode",{parentName:"p"},"failsafe_switch_mode")," is set to ",(0,i.kt)("inlineCode",{parentName:"p"},"STAGE1"),". Stage 1 will be aborted if the switch is moved to the OFF position before Stage 2 is engaged (see next)."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Stage 2")," is entered when your craft is ",(0,i.kt)("strong",{parentName:"p"},"armed")," and ",(0,i.kt)("strong",{parentName:"p"},"stage 1")," persists longer then the configured guard time (",(0,i.kt)("inlineCode",{parentName:"p"},"failsafe_delay"),"). All channels will remain at the applied fallback setting unless overruled by the chosen stage 2 procedure (",(0,i.kt)("inlineCode",{parentName:"p"},"failsafe_procedure"),")."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Stage 2")," is not activated until 5 seconds after the flight controller boots up. This is to prevent unwanted activation, as in the case of TX/RX gear with long bind procedures, before the RX sends out valid data."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Stage 2")," can also directly be activated when a transmitter switch that is configured to control the failsafe mode is switched ON and ",(0,i.kt)("inlineCode",{parentName:"p"},"failsafe_switch_mode")," is set to ",(0,i.kt)("inlineCode",{parentName:"p"},"STAGE2"),"."),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Stage 2")," will be aborted when it was due to:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"a lost RC signal and the RC signal has recovered."),(0,i.kt)("li",{parentName:"ul"},"a transmitter failsafe switch was set to ON position and the switch is set to OFF position (and ",(0,i.kt)("inlineCode",{parentName:"li"},"failsafe_switch_mode")," is ",(0,i.kt)("em",{parentName:"li"},"not")," set to ",(0,i.kt)("inlineCode",{parentName:"li"},"KILL"),").")),(0,i.kt)("p",null,"Note that:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"At the end of the stage 2 procedure, the flight controller will be disarmed and re-arming will be locked until the signal from the receiver is restored for specific amount of time depending on the procedure (see below) AND the arming switch is in the OFF position (when an arm switch is in use).")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("p",{parentName:"li"},"Prior to starting a stage 2 intervention it is checked if the throttle position was below ",(0,i.kt)("inlineCode",{parentName:"p"},"min_throttle")," level for the last ",(0,i.kt)("inlineCode",{parentName:"p"},"failsafe_throttle_low_delay")," seconds. If it was, the craft is assumed to be on the ground and is only disarmed. It may be re-armed without a power cycle."))),(0,i.kt)("p",null,"Some notes about ",(0,i.kt)("strong",{parentName:"p"},"SAFETY"),":"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"The failsafe system will be activated regardless of current throttle position. So when the failsafe intervention is aborted (RC signal restored/failsafe switch set to OFF) the current stick position will direct the craft !"),(0,i.kt)("li",{parentName:"ul"},"The craft may already be on the ground with motors stopped and that motors and props could spin again - the software does not currently detect if the craft is on the ground. Take care when using ",(0,i.kt)("inlineCode",{parentName:"li"},"MOTOR_STOP")," feature. ",(0,i.kt)("strong",{parentName:"li"},"Props will spin up without warning"),", when armed with ",(0,i.kt)("inlineCode",{parentName:"li"},"MOTOR_STOP")," feature ON (props are not spinning) ",(0,i.kt)("strong",{parentName:"li"},(0,i.kt)("em",{parentName:"strong"},"and"))," failsafe is activated !")),(0,i.kt)("h2",{id:"configuration"},"Configuration"),(0,i.kt)("p",null,"When configuring the flight controller failsafe, use the following steps:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Configure your receiver to do one of the following:")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Upon signal loss, send no signal/pulses over the channels"),(0,i.kt)("li",{parentName:"ul"},"Send an invalid signal over the channels (for example, send values lower than ",(0,i.kt)("inlineCode",{parentName:"li"},"rx_min_usec"),")")),(0,i.kt)("p",null,"and"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Ensure your receiver does not send out channel data that would cause a disarm by switch or sticks to be registered by the FC. This is especially important for those using a switch to arm.")),(0,i.kt)("p",null,"See your receiver's documentation for direction on how to accomplish one of these."),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Configure one of the transmitter switches to activate the failsafe mode.")),(0,i.kt)("ol",{start:2},(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Set ",(0,i.kt)("inlineCode",{parentName:"p"},"failsafe_off_delay")," to an appropriate value based on how high you fly")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Set ",(0,i.kt)("inlineCode",{parentName:"p"},"failsafe_throttle")," to a value that allows the aircraft to descend at approximately one meter per second (default is 1000 which should be throttle off)."))),(0,i.kt)("p",null,"These are the basic steps for flight controller failsafe configuration; see Failsafe Settings below for additional settings that may be changed."),(0,i.kt)("h2",{id:"failsafe-settings"},"Failsafe Settings"),(0,i.kt)("p",null,"Failsafe delays are configured in 0.1 second steps."),(0,i.kt)("p",null,"1 step = 0.1sec"),(0,i.kt)("p",null,"1 second = 10 steps"),(0,i.kt)("h3",{id:"failsafe_delay"},(0,i.kt)("inlineCode",{parentName:"h3"},"failsafe_delay")),(0,i.kt)("p",null,"Guard time for failsafe activation after signal lost. This is the amount of time the flight controller waits to see if it begins receiving a valid signal again before activating failsafe."),(0,i.kt)("h3",{id:"failsafe_off_delay"},(0,i.kt)("inlineCode",{parentName:"h3"},"failsafe_off_delay")),(0,i.kt)("p",null,"Delay after failsafe activates before motors finally turn off. This is the amount of time 'failsafe_throttle' is active. If you fly at higher altitudes you may need more time to descend safely."),(0,i.kt)("h3",{id:"failsafe_throttle"},(0,i.kt)("inlineCode",{parentName:"h3"},"failsafe_throttle")),(0,i.kt)("p",null,"Throttle level used for landing. Specify a value that causes the aircraft to descend at about 1M/sec. Default is set to 1000 which should correspond to throttle off."),(0,i.kt)("h3",{id:"failsafe_switch_mode"},(0,i.kt)("inlineCode",{parentName:"h3"},"failsafe_switch_mode")),(0,i.kt)("p",null,"Configure the RC switched failsafe action. It can be one of:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"STAGE1")," - activates Stage 1 failsafe. RC controls are applied as configured for Stage 1 and the ",(0,i.kt)("inlineCode",{parentName:"li"},"failsafe_delay")," guard time will have to elapse before Stage 2 is activated. This is useful if you want to simulate with a switch the exact signal loss failsafe behavior."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"STAGE2")," - skips Stage 1 and activates the Stage 2 procedure immediately (see ",(0,i.kt)("inlineCode",{parentName:"li"},"failsafe_procedure"),"). Useful if you want to assign instant auto-landing to a switch."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"KILL")," - disarms instantly (your craft will crash). Re-arming is locked for 1 second AND until the arming switch (if used) is moved to the OFF position. Similar effect can be achieved by:",(0,i.kt)("ul",{parentName:"li"},(0,i.kt)("li",{parentName:"ul"},"setting ",(0,i.kt)("inlineCode",{parentName:"li"},"failsafe_switch_mode")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"STAGE2")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"failsafe_procedure")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"DROP"),". The difference is that ",(0,i.kt)("inlineCode",{parentName:"li"},"DROP")," locks re-arming for 3 seconds instead of 1."),(0,i.kt)("li",{parentName:"ul"},"setting ",(0,i.kt)("inlineCode",{parentName:"li"},"failsafe_switch_mode")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"STAGE2"),", ",(0,i.kt)("inlineCode",{parentName:"li"},"failsafe_procedure")," to ",(0,i.kt)("inlineCode",{parentName:"li"},"AUTO-LAND"),", setting ",(0,i.kt)("inlineCode",{parentName:"li"},"failsafe_throttle")," to 1000 and ",(0,i.kt)("inlineCode",{parentName:"li"},"failsafe_off_delay")," to 0 (basically initiates an auto-landing but cuts it short immediately). This is not preferred method, since the reaction is slower and re-arming will be locked for 30 seconds."),(0,i.kt)("li",{parentName:"ul"},"using arm switch. This does not introduce re-arming locking.")))),(0,i.kt)("h3",{id:"failsafe_throttle_low_delay"},(0,i.kt)("inlineCode",{parentName:"h3"},"failsafe_throttle_low_delay")),(0,i.kt)("p",null,"Time throttle level must have been below 'min",(0,i.kt)("em",{parentName:"p"},"throttle' to ","_","only disarm")," instead of ",(0,i.kt)("em",{parentName:"p"},"full failsafe procedure"),"."),(0,i.kt)("p",null,"Use standard RX \u03bcs values. See ",(0,i.kt)("a",{parentName:"p",href:"/docs/development/Rx"},"Rx documentation"),"."),(0,i.kt)("h3",{id:"failsafe_procedure"},(0,i.kt)("inlineCode",{parentName:"h3"},"failsafe_procedure")),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"DROP"),": Just kill the motors and disarm (crash the craft). Re-arming is locked until RC link is available for at least 3 seconds and the arm switch (if used) is in the OFF position."),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"AUTO-LAND"),": Enable an auto-level mode, center the flight sticks and set the throttle to a predefined value (",(0,i.kt)("inlineCode",{parentName:"li"},"failsafe_throttle"),") for a predefined time (",(0,i.kt)("inlineCode",{parentName:"li"},"failsafe_off_delay"),"). This should allow the craft to come to a safer landing. Re-arming is locked until RC link is available for at least 30 seconds and the arm switch (if used) is in the OFF position.")),(0,i.kt)("h3",{id:"rx_min_usec"},(0,i.kt)("inlineCode",{parentName:"h3"},"rx_min_usec")),(0,i.kt)("p",null,"The lowest channel value considered valid. e.g. PWM/PPM pulse length"),(0,i.kt)("h3",{id:"rx_max_usec"},(0,i.kt)("inlineCode",{parentName:"h3"},"rx_max_usec")),(0,i.kt)("p",null,"The highest channel value considered valid. e.g. PWM/PPM pulse length"),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"rx_min_usec")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"rx_max_usec")," settings helps detect when your RX stops sending any data, enters failsafe mode or when the RX looses signal."),(0,i.kt)("p",null,"With a Graupner GR-24 configured for PWM output with failsafe on channels 1-4 set to OFF in the receiver settings then this setting, at its default value, will allow failsafe to be activated."),(0,i.kt)("h2",{id:"testing"},"Testing"),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Bench test the failsafe system before flying - ",(0,i.kt)("em",{parentName:"strong"},"remove props while doing so"),".")),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Arm the craft."),(0,i.kt)("li",{parentName:"ol"},"Turn off transmitter or unplug RX."),(0,i.kt)("li",{parentName:"ol"},"Observe motors spin at configured throttle setting for configured duration."),(0,i.kt)("li",{parentName:"ol"},"Observe motors turn off after configured duration."),(0,i.kt)("li",{parentName:"ol"},"Ensure that when you turn on your TX again or reconnect the RX that you cannot re-arm once the motors have stopped."),(0,i.kt)("li",{parentName:"ol"},"Power cycle the FC."),(0,i.kt)("li",{parentName:"ol"},"Arm the craft."),(0,i.kt)("li",{parentName:"ol"},"Turn off transmitter or unplug RX."),(0,i.kt)("li",{parentName:"ol"},"Observe motors spin at configured throttle setting for configured duration."),(0,i.kt)("li",{parentName:"ol"},"Turn on TX or reconnect RX."),(0,i.kt)("li",{parentName:"ol"},"Ensure that your switch positions don't now cause the craft to disarm (otherwise it would fall out of the sky on regained signal)."),(0,i.kt)("li",{parentName:"ol"},"Observe that normal flight behavior is resumed."),(0,i.kt)("li",{parentName:"ol"},"Disarm.")),(0,i.kt)("p",null,(0,i.kt)("strong",{parentName:"p"},"Field test the failsafe system.")),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Perform bench testing first!"),(0,i.kt)("li",{parentName:"ol"},"On a calm day go to an unpopulated area away from buildings or test indoors in a safe controlled environment - e.g. inside a big net."),(0,i.kt)("li",{parentName:"ol"},"Arm the craft."),(0,i.kt)("li",{parentName:"ol"},"Hover over something soft (long grass, ferns, heather, foam, etc.)."),(0,i.kt)("li",{parentName:"ol"},"Descend the craft and observe throttle position and record throttle value from your TX channel monitor. Ideally 1500 should be hover. So your value should be less than 1500."),(0,i.kt)("li",{parentName:"ol"},"Stop, disarm."),(0,i.kt)("li",{parentName:"ol"},"Set failsafe throttle to the recorded value."),(0,i.kt)("li",{parentName:"ol"},"Arm, hover over something soft again."),(0,i.kt)("li",{parentName:"ol"},"Turn off TX (!)"),(0,i.kt)("li",{parentName:"ol"},"Observe craft descends and motors continue to spin for the configured duration."),(0,i.kt)("li",{parentName:"ol"},"Observe FC disarms after the configured duration."),(0,i.kt)("li",{parentName:"ol"},"Remove flight battery.")),(0,i.kt)("p",null,"If craft descends too quickly then increase failsafe throttle setting."),(0,i.kt)("p",null,"Ensure that the duration is long enough for your craft to land at the altitudes you normally fly at."),(0,i.kt)("p",null,"Using a configured transmitter switch to activate failsafe mode, instead of switching off your TX, is good primary testing method in addition to the above procedure."))}p.isMDXComponent=!0}}]);