"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4710],{27374:(e,r,d)=>{d.r(r),d.d(r,{assets:()=>c,contentTitle:()=>i,default:()=>j,frontMatter:()=>t,metadata:()=>l,toc:()=>h});var s=d(85893),n=d(11151);const t={},i="TBS Colibri RACE",l={id:"wiki/boards/archive/COLIBRIRACE",title:"TBS Colibri RACE",description:"The Colibri RACE is a STM32F3 based flight control designed specifically to work with the TBS POWERCUBE multi rotor stack.",source:"@site/docs/wiki/boards/archive/COLIBRIRACE.md",sourceDirName:"wiki/boards/archive",slug:"/wiki/boards/archive/COLIBRIRACE",permalink:"/docs/wiki/boards/archive/COLIBRIRACE",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"wiki",previous:{title:"CJMCU",permalink:"/docs/wiki/boards/archive/CJMCU"},next:{title:"CrazyBee F3 FR",permalink:"/docs/wiki/boards/archive/CRAZYBEEF3FR"}},c={},h=[{value:"Hardware Features:",id:"hardware-features",level:2},{value:"Serial Ports",id:"serial-ports",level:2},{value:"Pinouts",id:"pinouts",level:2},{value:"SWD - ICSP",id:"swd---icsp",level:3},{value:"Internal Bus",id:"internal-bus",level:3},{value:"Servo",id:"servo",level:3},{value:"IO_1 - LED Strip",id:"io_1---led-strip",level:3},{value:"IO_2 - Sensor Interface",id:"io_2---sensor-interface",level:3},{value:"IO_3 - RC input",id:"io_3---rc-input",level:3},{value:"IO_4 - Buzzer",id:"io_4---buzzer",level:3},{value:"IO_5 - Free UART",id:"io_5---free-uart",level:3},{value:"IO_6 - IR TX (extension)",id:"io_6---ir-tx-extension",level:3}];function x(e){const r={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,n.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.h1,{id:"tbs-colibri-race",children:"TBS Colibri RACE"}),"\n",(0,s.jsx)(r.p,{children:"The Colibri RACE is a STM32F3 based flight control designed specifically to work with the TBS POWERCUBE multi rotor stack."}),"\n",(0,s.jsx)(r.h2,{id:"hardware-features",children:"Hardware Features:"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:["\n",(0,s.jsx)(r.p,{children:"STM32F303 based chipset for ultimate performance"}),"\n"]}),"\n",(0,s.jsxs)(r.li,{children:["\n",(0,s.jsx)(r.p,{children:"PPM, SBUS, DSM, DSMX input (5V and 3.3V provided over internal BUS). No inverters or hacks needed."}),"\n"]}),"\n",(0,s.jsxs)(r.li,{children:["\n",(0,s.jsx)(r.p,{children:"6 PWM ESC output channels (autoconnect, internal BUS)"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsx)(r.li,{children:"RGB LED strip support incl. power management"}),"\n",(0,s.jsx)(r.li,{children:"Extension port for GPS / external compass / pressure sensor"}),"\n",(0,s.jsx)(r.li,{children:"UART port for peripherals (Blackbox, FrSky telemetry etc.)"}),"\n",(0,s.jsx)(r.li,{children:"Choose between plug & play sockets or solder pads for R/C and buzzer"}),"\n",(0,s.jsx)(r.li,{children:"5V buzzer output"}),"\n",(0,s.jsx)(r.li,{children:"MPU6500 new generation accelerometer/gyro"}),"\n",(0,s.jsx)(r.li,{children:"3x status LED (DCDC pwr/ 3.3V pwr/ status)"}),"\n",(0,s.jsx)(r.li,{children:"Battery monitoring for 12V, 5V and VBat supply"}),"\n",(0,s.jsx)(r.li,{children:"Size: 36mmx36mm (30.5mm standard raster)"}),"\n",(0,s.jsx)(r.li,{children:"Weight: 4.4g"}),"\n"]}),"\n",(0,s.jsxs)(r.p,{children:["For more details please visit:\n",(0,s.jsx)(r.a,{href:"http://www.team-blacksheep.com/powercube",children:"http://www.team-blacksheep.com/powercube"})]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(r.h2,{id:"serial-ports",children:"Serial Ports"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Value"}),(0,s.jsx)(r.th,{children:"Identifier"}),(0,s.jsx)(r.th,{children:"Board Markings"}),(0,s.jsx)(r.th,{children:"Notes"})]})}),(0,s.jsxs)(r.tbody,{children:[(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"1"}),(0,s.jsx)(r.td,{children:"VCP"}),(0,s.jsx)(r.td,{children:"USB PORT"}),(0,s.jsx)(r.td,{children:"Main Port For MSP"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"2"}),(0,s.jsx)(r.td,{children:"USART1"}),(0,s.jsx)(r.td,{children:"FREE PORT"}),(0,s.jsx)(r.td,{children:"PC4 and PC5(Tx and Rx respectively)"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"3"}),(0,s.jsx)(r.td,{children:"USART2"}),(0,s.jsx)(r.td,{children:"PPM Serial"}),(0,s.jsx)(r.td,{children:"PA15"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"4"}),(0,s.jsx)(r.td,{children:"USART3"}),(0,s.jsx)(r.td,{children:"GPS PORT"}),(0,s.jsx)(r.td,{children:"PB10 and PB11(Tx and Rx respectively)"})]})]})]}),"\n",(0,s.jsx)(r.h2,{id:"pinouts",children:"Pinouts"}),"\n",(0,s.jsx)(r.p,{children:"Full pinout details are available in the manual, here:"}),"\n",(0,s.jsx)(r.p,{children:(0,s.jsx)(r.a,{href:"http://www.team-blacksheep.com/colibri_race",children:"http://www.team-blacksheep.com/colibri_race"})}),"\n",(0,s.jsx)(r.h3,{id:"swd---icsp",children:"SWD - ICSP"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Pin"}),(0,s.jsx)(r.th,{children:"Function"}),(0,s.jsx)(r.th,{children:"Notes"})]})}),(0,s.jsxs)(r.tbody,{children:[(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"1"}),(0,s.jsx)(r.td,{children:"VCC_IN"}),(0,s.jsx)(r.td,{children:"3.3 Volt"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"2"}),(0,s.jsx)(r.td,{children:"SWDIO"}),(0,s.jsx)(r.td,{})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"3"}),(0,s.jsx)(r.td,{children:"nRESET"}),(0,s.jsx)(r.td,{})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"4"}),(0,s.jsx)(r.td,{children:"SWCLK"}),(0,s.jsx)(r.td,{})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"5"}),(0,s.jsx)(r.td,{children:"Ground"}),(0,s.jsx)(r.td,{})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"6"}),(0,s.jsx)(r.td,{children:"SWO/TDO"}),(0,s.jsx)(r.td,{})]})]})]}),"\n",(0,s.jsx)(r.h3,{id:"internal-bus",children:"Internal Bus"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Pin"}),(0,s.jsx)(r.th,{children:"Function"}),(0,s.jsx)(r.th,{children:"Notes"})]})}),(0,s.jsxs)(r.tbody,{children:[(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"1"}),(0,s.jsx)(r.td,{children:"PWM1"}),(0,s.jsx)(r.td,{children:"MOTOR 1"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"2"}),(0,s.jsx)(r.td,{children:"PWM2"}),(0,s.jsx)(r.td,{children:"MOTOR 2"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"3"}),(0,s.jsx)(r.td,{children:"PWM3"}),(0,s.jsx)(r.td,{children:"MOTOR 3"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"4"}),(0,s.jsx)(r.td,{children:"PWM4"}),(0,s.jsx)(r.td,{children:"MOTOR 4"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"5"}),(0,s.jsx)(r.td,{children:"PWM5"}),(0,s.jsx)(r.td,{children:"MOTOR 5 (For Y6 or Hex X)"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"6"}),(0,s.jsx)(r.td,{children:"PWM6"}),(0,s.jsx)(r.td,{children:"MOTOR 6 (For Y6 or Hex X)"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"7"}),(0,s.jsx)(r.td,{children:"BST SDA"}),(0,s.jsx)(r.td,{children:"Use For TBS CorePro Control Device"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"8"}),(0,s.jsx)(r.td,{children:"BST SCL"}),(0,s.jsx)(r.td,{children:"Use For TBS CorePro Control Device"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"9"}),(0,s.jsx)(r.td,{children:"PWM7"}),(0,s.jsx)(r.td,{children:"Can be a normal GPIO (PA1) or PWM"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"10"}),(0,s.jsx)(r.td,{children:"PWM8"}),(0,s.jsx)(r.td,{children:"Can be a normal GPIO (PA2) or PWM"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"11"}),(0,s.jsx)(r.td,{children:"12.2V DCDC"}),(0,s.jsx)(r.td,{children:"If 12v is detected, the Blue LED will turn on"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"12"}),(0,s.jsx)(r.td,{children:"5.1V DCDC"}),(0,s.jsx)(r.td,{children:"Voltage for MCU"})]})]})]}),"\n",(0,s.jsx)(r.h3,{id:"servo",children:"Servo"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Pin"}),(0,s.jsx)(r.th,{children:"Function"}),(0,s.jsx)(r.th,{children:"Notes"})]})}),(0,s.jsxs)(r.tbody,{children:[(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"1"}),(0,s.jsx)(r.td,{children:"Ground"}),(0,s.jsx)(r.td,{})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"2"}),(0,s.jsx)(r.td,{children:"VCC_OUT"}),(0,s.jsx)(r.td,{children:"5.1 Volt output to LCD Strip"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"3"}),(0,s.jsx)(r.td,{children:"PWM Servo"}),(0,s.jsx)(r.td,{children:"PB14 - PWM10"})]})]})]}),"\n",(0,s.jsx)(r.h3,{id:"io_1---led-strip",children:"IO_1 - LED Strip"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Pin"}),(0,s.jsx)(r.th,{children:"Function"}),(0,s.jsx)(r.th,{children:"Notes"})]})}),(0,s.jsxs)(r.tbody,{children:[(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"1"}),(0,s.jsx)(r.td,{children:"LED_STRIP"}),(0,s.jsxs)(r.td,{children:["Enable ",(0,s.jsx)(r.code,{children:"feature LED_STRIP"})]})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"2"}),(0,s.jsx)(r.td,{children:"VCC_OUT"}),(0,s.jsx)(r.td,{children:"5.1 Volt output to LCD Strip"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"3"}),(0,s.jsx)(r.td,{children:"Ground"}),(0,s.jsx)(r.td,{})]})]})]}),"\n",(0,s.jsx)(r.h3,{id:"io_2---sensor-interface",children:"IO_2 - Sensor Interface"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Pin"}),(0,s.jsx)(r.th,{children:"Function"}),(0,s.jsx)(r.th,{children:"Notes"})]})}),(0,s.jsxs)(r.tbody,{children:[(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"1"}),(0,s.jsx)(r.td,{children:"VCC_OUT"}),(0,s.jsx)(r.td,{children:"4.7 Volt output to the device"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"2"}),(0,s.jsx)(r.td,{children:"Ground"}),(0,s.jsx)(r.td,{})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"3"}),(0,s.jsx)(r.td,{children:"UART3 TX"}),(0,s.jsx)(r.td,{children:"GPS"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"4"}),(0,s.jsx)(r.td,{children:"UART3 RX"}),(0,s.jsx)(r.td,{children:"GPS"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"5"}),(0,s.jsx)(r.td,{children:"SDA"}),(0,s.jsx)(r.td,{children:"mag, pressure, or other i2c device"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"6"}),(0,s.jsx)(r.td,{children:"SCL"}),(0,s.jsx)(r.td,{children:"mag, pressure, or other i2c device"})]})]})]}),"\n",(0,s.jsx)(r.h3,{id:"io_3---rc-input",children:"IO_3 - RC input"}),"\n",(0,s.jsxs)(r.p,{children:["IO_3 is used for RX_PPM/RX_SERIAL. Under the ",(0,s.jsx)(r.code,{children:"PORT"})," tab, set RX_SERIAL to UART2 when using RX_SERIAL."]}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Pin"}),(0,s.jsx)(r.th,{children:"Function"}),(0,s.jsx)(r.th,{children:"Notes"})]})}),(0,s.jsxs)(r.tbody,{children:[(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"1"}),(0,s.jsx)(r.td,{children:"PPM/Serial"}),(0,s.jsx)(r.td,{children:"Can PPM or Serial input"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"2"}),(0,s.jsx)(r.td,{children:"VCC_OUT"}),(0,s.jsx)(r.td,{children:"3.3 Volt output to the device"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"3"}),(0,s.jsx)(r.td,{children:"Ground"}),(0,s.jsx)(r.td,{})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"4"}),(0,s.jsx)(r.td,{children:"VCC_OUT"}),(0,s.jsx)(r.td,{children:"5.1 Volt output to the device"})]})]})]}),"\n",(0,s.jsx)(r.h3,{id:"io_4---buzzer",children:"IO_4 - Buzzer"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Pin"}),(0,s.jsx)(r.th,{children:"Function"}),(0,s.jsx)(r.th,{children:"Notes"})]})}),(0,s.jsxs)(r.tbody,{children:[(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"1"}),(0,s.jsx)(r.td,{children:"BUZZER"}),(0,s.jsx)(r.td,{children:"Normal high (5.1v)"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"2"}),(0,s.jsx)(r.td,{children:"VCC_OUT"}),(0,s.jsx)(r.td,{children:"5.1 Volt output to the device"})]})]})]}),"\n",(0,s.jsx)(r.h3,{id:"io_5---free-uart",children:"IO_5 - Free UART"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Pin"}),(0,s.jsx)(r.th,{children:"Function"}),(0,s.jsx)(r.th,{children:"Notes"})]})}),(0,s.jsxs)(r.tbody,{children:[(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"1"}),(0,s.jsx)(r.td,{children:"UART1 TX"}),(0,s.jsx)(r.td,{children:"Free UART"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"2"}),(0,s.jsx)(r.td,{children:"UART1 RX"}),(0,s.jsx)(r.td,{children:"Free UART"})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"3"}),(0,s.jsx)(r.td,{children:"Ground"}),(0,s.jsx)(r.td,{})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"4"}),(0,s.jsx)(r.td,{children:"VCC_OUT"}),(0,s.jsx)(r.td,{children:"4.7 Volt output to the device"})]})]})]}),"\n",(0,s.jsx)(r.h3,{id:"io_6---ir-tx-extension",children:"IO_6 - IR TX (extension)"}),"\n",(0,s.jsxs)(r.table,{children:[(0,s.jsx)(r.thead,{children:(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.th,{children:"Pin"}),(0,s.jsx)(r.th,{children:"Function"}),(0,s.jsx)(r.th,{children:"Notes"})]})}),(0,s.jsxs)(r.tbody,{children:[(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"1"}),(0,s.jsx)(r.td,{children:"IR TX"}),(0,s.jsx)(r.td,{})]}),(0,s.jsxs)(r.tr,{children:[(0,s.jsx)(r.td,{children:"2"}),(0,s.jsx)(r.td,{children:"Ground"}),(0,s.jsx)(r.td,{})]})]})]})]})}function j(e={}){const{wrapper:r}={...(0,n.a)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(x,{...e})}):x(e)}},11151:(e,r,d)=>{d.d(r,{Z:()=>l,a:()=>i});var s=d(67294);const n={},t=s.createContext(n);function i(e){const r=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),s.createElement(t.Provider,{value:r},e.children)}}}]);