"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7796],{22259:(d,e,r)=>{r.r(e),r.d(e,{assets:()=>l,contentTitle:()=>n,default:()=>j,frontMatter:()=>i,metadata:()=>h,toc:()=>c});var s=r(85893),t=r(11151);const i={},n="RUSHCORE7",h={id:"wiki/boards/archive/RUSHCORE7",title:"RUSHCORE7",description:"The RUSHCORE7 described here:",source:"@site/docs/wiki/boards/archive/RUSHCORE7.md",sourceDirName:"wiki/boards/archive",slug:"/wiki/boards/archive/RUSHCORE7",permalink:"/docs/wiki/boards/archive/RUSHCORE7",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"wiki",previous:{title:"RJXF7",permalink:"/docs/wiki/boards/archive/RJXF7"},next:{title:"SKYZONEF405",permalink:"/docs/wiki/boards/archive/SKYZONEF405"}},l={},c=[{value:"Uarts",id:"uarts",level:3},{value:"I2C",id:"i2c",level:3},{value:"Buzzer/LED output",id:"buzzerled-output",level:3},{value:"VBAT input with 1/10 divider ratio,Current signal input,Analog/digit RSSI input",id:"vbat-input-with-110-divider-ratiocurrent-signal-inputanalogdigit-rssi-input",level:3},{value:"9 Outputs",id:"9-outputs",level:3},{value:"Gyro &amp; ACC ,support ICM20602 and MPU6000",id:"gyro--acc-support-icm20602-and-mpu6000",level:3},{value:"OSD MAX7456",id:"osd-max7456",level:3},{value:"16Mbyte flash",id:"16mbyte-flash",level:3},{value:"SWD",id:"swd",level:3}];function x(d){const e={a:"a",h1:"h1",h3:"h3",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...d.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h1,{id:"rushcore7",children:"RUSHCORE7"}),"\n",(0,s.jsx)(e.p,{children:"The RUSHCORE7 described here:"}),"\n",(0,s.jsx)(e.p,{children:"This board use the STM32F722RET6 microcontroller and have the following features:"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"High-performance and DSP with FPU, ARM Cortex-M7 MCU with 512 Kbytes Flash"}),"\n",(0,s.jsx)(e.li,{children:"216 MHz CPU,462 DMIPS/2.14 DMIPS/MHz (Dhrystone 2.1) and DSP instructions, Art Accelerator, L1 cache, SDRAM"}),"\n",(0,s.jsx)(e.li,{children:"Support MPU6000 or ICM20602"}),"\n",(0,s.jsx)(e.li,{children:"OSD on board"}),"\n",(0,s.jsx)(e.li,{children:"The 16M byte SPI flash on board for data logging"}),"\n",(0,s.jsx)(e.li,{children:"USB VCP and boot button on board(for DFU)"}),"\n",(0,s.jsx)(e.li,{children:"BEC 5v/2A on board"}),"\n",(0,s.jsx)(e.li,{children:"Serial LED (LED_STRIP)"}),"\n",(0,s.jsx)(e.li,{children:"VBAT/CURR/RSSI sensors input"}),"\n",(0,s.jsx)(e.li,{children:"Suppose IRC Tramp/SmartAudio/FPV Camera Control/FPORT/telemetry"}),"\n",(0,s.jsx)(e.li,{children:"Supports SBus, Spektrum1024/2048, PPM etc"}),"\n",(0,s.jsx)(e.li,{children:"Supports I2C device extend(baro/compass/OLED etc)"}),"\n",(0,s.jsx)(e.li,{children:"Supports GPS"}),"\n",(0,s.jsxs)(e.li,{children:["More about: ",(0,s.jsx)(e.a,{href:"http://www.rushfpv.com",children:"www.rushfpv.com"})]}),"\n"]}),"\n",(0,s.jsx)(e.h3,{id:"uarts",children:"Uarts"}),"\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"Value"}),(0,s.jsx)(e.th,{children:"Identifier"}),(0,s.jsx)(e.th,{children:"RX"}),(0,s.jsx)(e.th,{children:"TX"}),(0,s.jsx)(e.th,{children:"Notes"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"1"}),(0,s.jsx)(e.td,{children:"USART1"}),(0,s.jsx)(e.td,{children:"PB7"}),(0,s.jsx)(e.td,{children:"PB6"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"2"}),(0,s.jsx)(e.td,{children:"USART2"}),(0,s.jsx)(e.td,{children:"PA3"}),(0,s.jsx)(e.td,{children:"PA2"}),(0,s.jsx)(e.td,{children:"FOR SBUS IN(inverter build in)/PPM"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"3"}),(0,s.jsx)(e.td,{children:"USART3"}),(0,s.jsx)(e.td,{children:"PC11"}),(0,s.jsx)(e.td,{children:"PC10"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"4"}),(0,s.jsx)(e.td,{children:"USART4"}),(0,s.jsx)(e.td,{children:"PA1"}),(0,s.jsx)(e.td,{children:"PA0"}),(0,s.jsx)(e.td,{children:"PA0 FOR RSSI/FPORT/TEL etc"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"5"}),(0,s.jsx)(e.td,{children:"USART5"}),(0,s.jsx)(e.td,{children:"PD2"}),(0,s.jsx)(e.td,{children:"PC12"}),(0,s.jsx)(e.td,{children:"PC12 TRAMP/SmartAudio"})]})]})]}),"\n",(0,s.jsx)(e.h3,{id:"i2c",children:"I2C"}),"\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"Value"}),(0,s.jsx)(e.th,{children:"Identifier"}),(0,s.jsx)(e.th,{children:"function"}),(0,s.jsx)(e.th,{children:"pin"}),(0,s.jsx)(e.th,{children:"Notes"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"1"}),(0,s.jsx)(e.td,{children:"I2C1"}),(0,s.jsx)(e.td,{children:"SDA"}),(0,s.jsx)(e.td,{children:"PB9"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"2"}),(0,s.jsx)(e.td,{children:"I2C1"}),(0,s.jsx)(e.td,{children:"SCL"}),(0,s.jsx)(e.td,{children:"PB8"}),(0,s.jsx)(e.td,{})]})]})]}),"\n",(0,s.jsx)(e.h3,{id:"buzzerled-output",children:"Buzzer/LED output"}),"\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"Value"}),(0,s.jsx)(e.th,{children:"Identifier"}),(0,s.jsx)(e.th,{children:"function"}),(0,s.jsx)(e.th,{children:"pin"}),(0,s.jsx)(e.th,{children:"Notes"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"1"}),(0,s.jsx)(e.td,{children:"LED0"}),(0,s.jsx)(e.td,{children:"LED"}),(0,s.jsx)(e.td,{children:"PC13"}),(0,s.jsx)(e.td,{children:"On board"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"2"}),(0,s.jsx)(e.td,{children:"Buzzer"}),(0,s.jsx)(e.td,{children:"BEE"}),(0,s.jsx)(e.td,{children:"PB1"}),(0,s.jsx)(e.td,{})]})]})]}),"\n",(0,s.jsx)(e.h3,{id:"vbat-input-with-110-divider-ratiocurrent-signal-inputanalogdigit-rssi-input",children:"VBAT input with 1/10 divider ratio,Current signal input,Analog/digit RSSI input"}),"\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"Value"}),(0,s.jsx)(e.th,{children:"Identifier"}),(0,s.jsx)(e.th,{children:"function"}),(0,s.jsx)(e.th,{children:"pin"}),(0,s.jsx)(e.th,{children:"Notes"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"1"}),(0,s.jsx)(e.td,{children:"ADC1"}),(0,s.jsx)(e.td,{children:"VBAT"}),(0,s.jsx)(e.td,{children:"PC1"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"2"}),(0,s.jsx)(e.td,{children:"ADC1"}),(0,s.jsx)(e.td,{children:"CURR"}),(0,s.jsx)(e.td,{children:"PC3"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"3"}),(0,s.jsx)(e.td,{children:"ADC1"}),(0,s.jsx)(e.td,{children:"RSSI"}),(0,s.jsx)(e.td,{children:"PA0"}),(0,s.jsx)(e.td,{})]})]})]}),"\n",(0,s.jsx)(e.h3,{id:"9-outputs",children:"9 Outputs"}),"\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"Value"}),(0,s.jsx)(e.th,{children:"Identifier"}),(0,s.jsx)(e.th,{children:"function"}),(0,s.jsx)(e.th,{children:"pin"}),(0,s.jsx)(e.th,{children:"Notes"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"1"}),(0,s.jsx)(e.td,{children:"TIM2_CH3"}),(0,s.jsx)(e.td,{children:"PPM"}),(0,s.jsx)(e.td,{children:"PA2"}),(0,s.jsx)(e.td,{children:"PPM/SBUS"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"2"}),(0,s.jsx)(e.td,{children:"TIM8_CH3"}),(0,s.jsx)(e.td,{children:"OUPUT1"}),(0,s.jsx)(e.td,{children:"PC8"}),(0,s.jsx)(e.td,{children:"DMA"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"3"}),(0,s.jsx)(e.td,{children:"TIM8_CH1"}),(0,s.jsx)(e.td,{children:"OUPUT2"}),(0,s.jsx)(e.td,{children:"PC6"}),(0,s.jsx)(e.td,{children:"DMA"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"4"}),(0,s.jsx)(e.td,{children:"TIM8_CH4"}),(0,s.jsx)(e.td,{children:"OUPUT3"}),(0,s.jsx)(e.td,{children:"PC9"}),(0,s.jsx)(e.td,{children:"DMA"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"5"}),(0,s.jsx)(e.td,{children:"TIM8_CH2"}),(0,s.jsx)(e.td,{children:"OUPUT4"}),(0,s.jsx)(e.td,{children:"PC7"}),(0,s.jsx)(e.td,{children:"DMA"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"6"}),(0,s.jsx)(e.td,{children:"TIM1_CH1"}),(0,s.jsx)(e.td,{children:"OUPUT5"}),(0,s.jsx)(e.td,{children:"PA8"}),(0,s.jsx)(e.td,{children:"DMA"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"7"}),(0,s.jsx)(e.td,{children:"TIM1_CH2"}),(0,s.jsx)(e.td,{children:"OUPUT6"}),(0,s.jsx)(e.td,{children:"PA9"}),(0,s.jsx)(e.td,{children:"DMA"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"8"}),(0,s.jsx)(e.td,{children:"TIM2_CH4"}),(0,s.jsx)(e.td,{children:"PWM"}),(0,s.jsx)(e.td,{children:"PB11"}),(0,s.jsx)(e.td,{children:"DMA LED_STRIP"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"9"}),(0,s.jsx)(e.td,{children:"TIM3_CH3"}),(0,s.jsx)(e.td,{children:"PWM"}),(0,s.jsx)(e.td,{children:"PB0"}),(0,s.jsx)(e.td,{children:"FPV Camera Control(FCAM)"})]})]})]}),"\n",(0,s.jsx)(e.h3,{id:"gyro--acc-support-icm20602-and-mpu6000",children:"Gyro & ACC ,support ICM20602 and MPU6000"}),"\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"Value"}),(0,s.jsx)(e.th,{children:"Identifier"}),(0,s.jsx)(e.th,{children:"function"}),(0,s.jsx)(e.th,{children:"pin"}),(0,s.jsx)(e.th,{children:"Notes"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"1"}),(0,s.jsx)(e.td,{children:"SPI1"}),(0,s.jsx)(e.td,{children:"SCK"}),(0,s.jsx)(e.td,{children:"PA5"}),(0,s.jsx)(e.td,{children:"MPU6000 & ICM20602"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"2"}),(0,s.jsx)(e.td,{children:"SPI1"}),(0,s.jsx)(e.td,{children:"MISO"}),(0,s.jsx)(e.td,{children:"PA6"}),(0,s.jsx)(e.td,{children:"MPU6000 & ICM20602"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"3"}),(0,s.jsx)(e.td,{children:"SPI1"}),(0,s.jsx)(e.td,{children:"MOSI"}),(0,s.jsx)(e.td,{children:"PA7"}),(0,s.jsx)(e.td,{children:"MPU6000 & ICM20602"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"4"}),(0,s.jsx)(e.td,{children:"SPI1"}),(0,s.jsx)(e.td,{children:"CS"}),(0,s.jsx)(e.td,{children:"PA4"}),(0,s.jsx)(e.td,{children:"MPU6000 & ICM20602"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"5"}),(0,s.jsx)(e.td,{children:"SPI1"}),(0,s.jsx)(e.td,{children:"INT"}),(0,s.jsx)(e.td,{children:"PC4"}),(0,s.jsx)(e.td,{children:"MPU6000 & ICM20602"})]})]})]}),"\n",(0,s.jsx)(e.h3,{id:"osd-max7456",children:"OSD MAX7456"}),"\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"Value"}),(0,s.jsx)(e.th,{children:"Identifier"}),(0,s.jsx)(e.th,{children:"function"}),(0,s.jsx)(e.th,{children:"pin"}),(0,s.jsx)(e.th,{children:"Notes"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"1"}),(0,s.jsx)(e.td,{children:"SPI2"}),(0,s.jsx)(e.td,{children:"SCK"}),(0,s.jsx)(e.td,{children:"PB13"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"2"}),(0,s.jsx)(e.td,{children:"SPI2"}),(0,s.jsx)(e.td,{children:"MISO"}),(0,s.jsx)(e.td,{children:"PB14"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"3"}),(0,s.jsx)(e.td,{children:"SPI2"}),(0,s.jsx)(e.td,{children:"MOSI"}),(0,s.jsx)(e.td,{children:"PB15"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"4"}),(0,s.jsx)(e.td,{children:"SPI2"}),(0,s.jsx)(e.td,{children:"CS"}),(0,s.jsx)(e.td,{children:"PB12"}),(0,s.jsx)(e.td,{})]})]})]}),"\n",(0,s.jsx)(e.h3,{id:"16mbyte-flash",children:"16Mbyte flash"}),"\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"Value"}),(0,s.jsx)(e.th,{children:"Identifier"}),(0,s.jsx)(e.th,{children:"function"}),(0,s.jsx)(e.th,{children:"pin"}),(0,s.jsx)(e.th,{children:"Notes"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"1"}),(0,s.jsx)(e.td,{children:"SPI3"}),(0,s.jsx)(e.td,{children:"SCK"}),(0,s.jsx)(e.td,{children:"PB3"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"2"}),(0,s.jsx)(e.td,{children:"SPI3"}),(0,s.jsx)(e.td,{children:"MISO"}),(0,s.jsx)(e.td,{children:"PB4"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"3"}),(0,s.jsx)(e.td,{children:"SPI3"}),(0,s.jsx)(e.td,{children:"MOSI"}),(0,s.jsx)(e.td,{children:"PB5"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"4"}),(0,s.jsx)(e.td,{children:"SPI3"}),(0,s.jsx)(e.td,{children:"CS"}),(0,s.jsx)(e.td,{children:"PC15"}),(0,s.jsx)(e.td,{})]})]})]}),"\n",(0,s.jsx)(e.h3,{id:"swd",children:"SWD"}),"\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"Pin"}),(0,s.jsx)(e.th,{children:"Function"}),(0,s.jsx)(e.th,{children:"Notes"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"1"}),(0,s.jsx)(e.td,{children:"SWCLK"}),(0,s.jsx)(e.td,{children:"PAD"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"2"}),(0,s.jsx)(e.td,{children:"Ground"}),(0,s.jsx)(e.td,{children:"PAD"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"3"}),(0,s.jsx)(e.td,{children:"SWDIO"}),(0,s.jsx)(e.td,{children:"PAD"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"4"}),(0,s.jsx)(e.td,{children:"3V3"}),(0,s.jsx)(e.td,{children:"PAD"})]})]})]})]})}function j(d={}){const{wrapper:e}={...(0,t.a)(),...d.components};return e?(0,s.jsx)(e,{...d,children:(0,s.jsx)(x,{...d})}):x(d)}},11151:(d,e,r)=>{r.d(e,{Z:()=>h,a:()=>n});var s=r(67294);const t={},i=s.createContext(t);function n(d){const e=s.useContext(i);return s.useMemo((function(){return"function"==typeof d?d(e):{...e,...d}}),[e,d])}function h(d){let e;return e=d.disableParentContext?"function"==typeof d.components?d.components(t):d.components||t:n(d.components),s.createElement(i.Provider,{value:e},d.children)}}}]);