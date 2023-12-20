"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8316],{82109:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>o,contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>h});var i=n(85893),d=n(11151);const r={},l="Modes",s={id:"development/Modes",title:"Modes",description:"There are various modes that can be toggled on or off. Modes can be enabled/disabled by stick positions, auxiliary receiver channels and other events such as failsafe detection.",source:"@site/docs/development/Modes.md",sourceDirName:"development",slug:"/development/Modes",permalink:"/docs/development/Modes",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"development",previous:{title:"Mixer",permalink:"/docs/development/Mixer"},next:{title:"OSD Profiles",permalink:"/docs/development/OSD-Profiles"}},o={},h=[{value:"Auto-leveled flight",id:"auto-leveled-flight",level:2},{value:"Mode details",id:"mode-details",level:2},{value:"Angle",id:"angle",level:3},{value:"Horizon",id:"horizon",level:3},{value:"Headfree",id:"headfree",level:3},{value:"Airmode",id:"airmode",level:3},{value:"Auxiliary Configuration",id:"auxiliary-configuration",level:2},{value:"CLI",id:"cli",level:3}];function a(e){const t={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{id:"modes",children:"Modes"}),"\n",(0,i.jsx)(t.p,{children:"There are various modes that can be toggled on or off. Modes can be enabled/disabled by stick positions, auxiliary receiver channels and other events such as failsafe detection."}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"ID"}),(0,i.jsx)(t.th,{children:"Short Name"}),(0,i.jsx)(t.th,{children:"Function"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"0"}),(0,i.jsx)(t.td,{children:"ARM"}),(0,i.jsx)(t.td,{children:"Enables motors and flight stabilisation"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"1"}),(0,i.jsx)(t.td,{children:"ANGLE"}),(0,i.jsx)(t.td,{children:"Legacy auto-level flight mode"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"2"}),(0,i.jsx)(t.td,{children:"HORIZON"}),(0,i.jsx)(t.td,{children:"Auto-level flight mode"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"4"}),(0,i.jsx)(t.td,{children:"ANTI GRAVITY"}),(0,i.jsx)(t.td,{children:"Prevents dips and rolls on fast throttle changes"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"5"}),(0,i.jsx)(t.td,{children:"MAG"}),(0,i.jsx)(t.td,{children:"Heading lock"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"6"}),(0,i.jsx)(t.td,{children:"HEADFREE"}),(0,i.jsx)(t.td,{children:"Head Free - When enabled yaw has no effect on pitch/roll inputs"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"7"}),(0,i.jsx)(t.td,{children:"HEADADJ"}),(0,i.jsx)(t.td,{children:"Heading Adjust - Sets a new yaw origin for HEADFREE mode"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"8"}),(0,i.jsx)(t.td,{children:"CAMSTAB"}),(0,i.jsx)(t.td,{children:"Camera Stabilisation"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"12"}),(0,i.jsx)(t.td,{children:"PASSTHRU"}),(0,i.jsx)(t.td,{children:"Pass roll, yaw, and pitch directly from rx to servos in airplane mix"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"13"}),(0,i.jsx)(t.td,{children:"BEEPERON"}),(0,i.jsx)(t.td,{children:"Enable beeping - useful for locating a crashed aircraft"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"15"}),(0,i.jsx)(t.td,{children:"LEDLOW"}),(0,i.jsx)(t.td,{children:"Switch off LED_STRIP output"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"17"}),(0,i.jsx)(t.td,{children:"CALIB"}),(0,i.jsx)(t.td,{children:"Start in-flight calibration"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"19"}),(0,i.jsx)(t.td,{children:"OSD"}),(0,i.jsx)(t.td,{children:"Enable/Disable On-Screen-Display (OSD)"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"20"}),(0,i.jsx)(t.td,{children:"TELEMETRY"}),(0,i.jsx)(t.td,{children:"Enable telemetry via switch"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"23"}),(0,i.jsx)(t.td,{children:"SERVO1"}),(0,i.jsx)(t.td,{children:"Servo 1"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"24"}),(0,i.jsx)(t.td,{children:"SERVO2"}),(0,i.jsx)(t.td,{children:"Servo 2"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"25"}),(0,i.jsx)(t.td,{children:"SERVO3"}),(0,i.jsx)(t.td,{children:"Servo 3"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"26"}),(0,i.jsx)(t.td,{children:"BLACKBOX"}),(0,i.jsx)(t.td,{children:"Enable BlackBox logging"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"27"}),(0,i.jsx)(t.td,{children:"FAILSAFE"}),(0,i.jsx)(t.td,{children:"Enter failsafe stage 2 manually"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"28"}),(0,i.jsx)(t.td,{children:"AIRMODE"}),(0,i.jsx)(t.td,{children:"Alternative mixer and additional PID logic for more stable copter"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"29"}),(0,i.jsx)(t.td,{children:"3D"}),(0,i.jsx)(t.td,{children:"Enable 3D mode"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"30"}),(0,i.jsx)(t.td,{children:"FPV ANGLE MIX"}),(0,i.jsx)(t.td,{children:"Apply yaw rotation relative to a FPV camera mounted at a preset angle"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"31"}),(0,i.jsx)(t.td,{children:"BLACKBOX ERASE"}),(0,i.jsx)(t.td,{children:"Erase the contents of the onboard flash log chip (takes > 30 s)"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"32"}),(0,i.jsx)(t.td,{children:"CAMERA CONTROL 1"}),(0,i.jsx)(t.td,{children:"Control function 1 of the onboard camera (if supported)"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"33"}),(0,i.jsx)(t.td,{children:"CAMERA CONTROL 2"}),(0,i.jsx)(t.td,{children:"Control function 2 of the onboard camera (if supported)"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"34"}),(0,i.jsx)(t.td,{children:"CAMERA CONTROL 3"}),(0,i.jsx)(t.td,{children:"Control function 3 of the onboard camera (if supported)"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"35"}),(0,i.jsx)(t.td,{children:"FLIP OVER AFTER CRASH"}),(0,i.jsx)(t.td,{children:"Reverse the motors to flip over an upside down craft after a crash (DShot required)"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"36"}),(0,i.jsx)(t.td,{children:"BOXPREARM"}),(0,i.jsx)(t.td,{children:"When arming, wait for this switch to be activated before actually arming"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"37"}),(0,i.jsx)(t.td,{children:"BEEP GPS SATELLITE COUNT"}),(0,i.jsx)(t.td,{children:"Use a number of beeps to indicate the number of GPS satellites found"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"39"}),(0,i.jsx)(t.td,{children:"VTX PIT MODE"}),(0,i.jsx)(t.td,{children:"Switch the VTX into pit mode (low output power, if supported)"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"40"}),(0,i.jsx)(t.td,{children:"USER1"}),(0,i.jsx)(t.td,{children:"User defined switch 1. Intended to be used to control an arbitrary output with PINIO"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"41"}),(0,i.jsx)(t.td,{children:"USER2"}),(0,i.jsx)(t.td,{children:"User defined switch 2. Intended to be used to control an arbitrary output with PINIO"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"42"}),(0,i.jsx)(t.td,{children:"USER3"}),(0,i.jsx)(t.td,{children:"User defined switch 3. Intended to be used to control an arbitrary output with PINIO"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"43"}),(0,i.jsx)(t.td,{children:"USER4"}),(0,i.jsx)(t.td,{children:"User defined switch 4. Intended to be used to control an arbitrary output with PINIO"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"44"}),(0,i.jsx)(t.td,{children:"PID AUDIO"}),(0,i.jsx)(t.td,{children:"Enable output of PID controller state as audio"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"45"}),(0,i.jsx)(t.td,{children:"PARALYZE"}),(0,i.jsx)(t.td,{children:"Permanently disable a crashed craft until it is power cycled"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"46"}),(0,i.jsx)(t.td,{children:"GPS RESCUE"}),(0,i.jsx)(t.td,{children:"Enable 'GPS Rescue' to return the craft to the location where it was last armed"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"47"}),(0,i.jsx)(t.td,{children:"ACRO TRAINER"}),(0,i.jsx)(t.td,{children:"Enable 'acro trainer' angle limiting in acro mode"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"48"}),(0,i.jsx)(t.td,{children:"DISABLE VTX CONTROL"}),(0,i.jsx)(t.td,{children:"Disable the control of VTX settings through the OSD"})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"49"}),(0,i.jsx)(t.td,{children:"LAUNCH CONTROL"}),(0,i.jsx)(t.td,{children:"Race start assistance system"})]})]})]}),"\n",(0,i.jsx)(t.h2,{id:"auto-leveled-flight",children:"Auto-leveled flight"}),"\n",(0,i.jsx)(t.p,{children:'The default flight mode does not stabilize the multicopter around the roll and the pitch axes. That is, the multicopter does not level on its own if you center the pitch and roll sticks on the radio. Rather, they work just like the yaw axis: the rate of rotation of each axis is controlled directly by the related stick on the radio, and by leaving them centered the flight controller will just try to keep the multicopter in whatever orientation it\'s in. This default mode is called "Rate" mode, also sometime called "Acro" (from "acrobatic") or "Manual" mode, and is active whenever no auto-leveled mode is enabled.'}),"\n",(0,i.jsx)(t.p,{children:"If your flight controller is equipped with a 3 axis accelerometer (very likely), then you can enable one of the two available auto leveled flight modes."}),"\n",(0,i.jsx)(t.h2,{id:"mode-details",children:"Mode details"}),"\n",(0,i.jsx)(t.h3,{id:"angle",children:"Angle"}),"\n",(0,i.jsx)(t.p,{children:"In this auto-leveled mode the roll and pitch channels control the angle between the relevant axis and the vertical, achieving leveled flight just by leaving the sticks centered."}),"\n",(0,i.jsx)(t.h3,{id:"horizon",children:"Horizon"}),"\n",(0,i.jsx)(t.p,{children:"This hybrid mode works exactly like the previous ANGLE mode with centered roll and pitch sticks (thus enabling auto-leveled flight), then gradually behaves more and more like the default RATE mode as the sticks are moved away from the center position."}),"\n",(0,i.jsx)(t.h3,{id:"headfree",children:"Headfree"}),"\n",(0,i.jsx)(t.p,{children:'In this mode, the "head" of the multicopter is always pointing to the same direction as when the feature was activated. This means that when the multicopter rotates around the Z axis (yaw), the controls will always respond according the same "head" direction.'}),"\n",(0,i.jsx)(t.p,{children:"With this mode it is easier to control the multicopter, even fly it with the physical head towards you since the controls always respond the same. This is a friendly mode to new users of multicopters and can prevent losing the control when you don't know the head direction."}),"\n",(0,i.jsx)(t.h3,{id:"airmode",children:"Airmode"}),"\n",(0,i.jsx)(t.p,{children:"In the standard mixer / mode, when the roll, pitch and yaw gets calculated and saturates a motor, all motors will be reduced equally. When a motor goes below minimum it gets clipped off. Say you had your throttle just above minimum and tried to pull a quick roll - since two motors can't go any lower, you essentially get half the power (half of your PID gain). If your inputs would have asked for more than a 100% difference between the high and low motors, the low motors would get clipped, breaking the symmetry of the motor balance by unevenly reducing the gain."}),"\n",(0,i.jsx)(t.p,{children:"Airmode will enable full PID correction during zero throttle and give you ability for nice zero throttle gliding and acrobatics. In addition, the cornering / turns will be much tighter now as there is always maximum possible correction performed."}),"\n",(0,i.jsx)(t.p,{children:"Airmode can also be enabled to work at all times by always putting it on the same switch such as your arm switch, alternatively you can enable/disable it in air."}),"\n",(0,i.jsx)(t.p,{children:"Additional points and benefits:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Airmode will additionally fully enable Iterm at zero throttle. Note that there is still some protection on the ground when throttle zeroed (below min\\check) and roll/pitch sticks centered. This is a basic protection to limit motors spooling up on the ground."}),"\n",(0,i.jsx)(t.li,{children:"Also the Iterm will be reset above 70% of stick input in acro mode to prevent quick Iterm windups during finishes of rolls and flips, which will provide much cleaner and more natural stops of flips and rolls what again opens the ability to have higher I gains for some. Note that AIRMODE will also overrule motor stop function! It will basically also act as an idle up switch."}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"auxiliary-configuration",children:"Auxiliary Configuration"}),"\n",(0,i.jsx)(t.p,{children:"Spare auxiliary receiver channels can be used to enable/disable modes. Some modes can only be enabled this way."}),"\n",(0,i.jsx)(t.p,{children:"Configure your transmitter so that switches or dials (potentiometers) send channel data on channels 5 and upwards (the first 4 channels are usually occupied by the throttle, aileron, rudder, and elevator channels)."}),"\n",(0,i.jsx)(t.p,{children:(0,i.jsx)(t.em,{children:"e.g. You can configure a 3 position switch to send 1000 when the switch is low, 1500 when the switch is in the middle and 2000 when the switch is high."})}),"\n",(0,i.jsx)(t.p,{children:"Configure your tx/rx channel limits to use values between 1000 and 2000. The range used by mode ranges is fixed to 900 to 2100."}),"\n",(0,i.jsx)(t.p,{children:"When a channel is within a specified range the corresponding mode is enabled."}),"\n",(0,i.jsx)(t.p,{children:"Use the GUI configuration tool to allow easy configuration when channel."}),"\n",(0,i.jsx)(t.h3,{id:"cli",children:"CLI"}),"\n",(0,i.jsxs)(t.p,{children:["There is a CLI command, ",(0,i.jsx)(t.code,{children:"aux"})," that allows auxiliary configuration. It takes 5 arguments as follows:"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"AUX range slot number (0 - 39)"}),"\n",(0,i.jsx)(t.li,{children:"mode id (see mode list above)"}),"\n",(0,i.jsx)(t.li,{children:"AUX channel index (AUX1 = 0, AUX2 = 1,... etc)"}),"\n",(0,i.jsx)(t.li,{children:"low position, from 900 to 2100. Should be a multiple of 25."}),"\n",(0,i.jsx)(t.li,{children:"high position, from 900 to 2100. Should be a multiple of 25."}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"If the low and high position are the same then the values are ignored."}),"\n",(0,i.jsx)(t.p,{children:"e.g."}),"\n",(0,i.jsx)(t.p,{children:"Configure AUX range slot 0 to enable ARM when AUX1 is within 1700 and 2100."}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"aux 0 0 0 1700 2100\n"})}),"\n",(0,i.jsxs)(t.p,{children:["You can display the AUX configuration by using the ",(0,i.jsx)(t.code,{children:"aux"})," command with no arguments."]})]})}function c(e={}){const{wrapper:t}={...(0,d.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},11151:(e,t,n)=>{n.d(t,{Z:()=>s,a:()=>l});var i=n(67294);const d={},r=i.createContext(d);function l(e){const t=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:l(e.components),i.createElement(r.Provider,{value:t},e.children)}}}]);