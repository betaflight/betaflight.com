"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9216],{994:(d,e,s)=>{s.r(e),s.d(e,{assets:()=>l,contentTitle:()=>n,default:()=>x,frontMatter:()=>i,metadata:()=>h,toc:()=>c});var r=s(85893),t=s(11151);const i={},n="Single Wire Soft Serial",h={id:"wiki/guides/current/Single-Wire-Software-Serial",title:"Single Wire Soft Serial",description:"Disclaimer:",source:"@site/docs/wiki/guides/current/Single-Wire-Software-Serial.md",sourceDirName:"wiki/guides/current",slug:"/wiki/guides/current/Single-Wire-Software-Serial",permalink:"/docs/wiki/guides/current/Single-Wire-Software-Serial",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"wiki",previous:{title:"Setup for Fixed Wing Aircraft",permalink:"/docs/wiki/guides/current/Setup-for-a-Fixed-Wing-Aircraft"},next:{title:"Single Wire FlySky IBUS Telemetry",permalink:"/docs/wiki/guides/current/Single-wire-FlySky-IBus-telemetry"}},l={},c=[{value:"Disclaimer:",id:"disclaimer",level:3},{value:"Software Serial List of compatible pins",id:"software-serial-list-of-compatible-pins",level:3}];function j(d){const e={a:"a",code:"code",h1:"h1",h3:"h3",hr:"hr",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...d.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.h1,{id:"single-wire-soft-serial",children:"Single Wire Soft Serial"}),"\n",(0,r.jsx)(e.h3,{id:"disclaimer",children:"Disclaimer:"}),"\n",(0,r.jsx)(e.p,{children:"Software Serial is not recommended for RC control links and should not be used to connect serial receivers."}),"\n",(0,r.jsx)(e.h3,{id:"software-serial-list-of-compatible-pins",children:"Software Serial List of compatible pins"}),"\n",(0,r.jsx)(e.p,{children:"Not for public viewing yet."}),"\n",(0,r.jsx)(e.p,{children:"List of compatible pins."}),"\n",(0,r.jsx)(e.p,{children:"CLI commands to free up PWM 5 and PWM 6:"}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.code,{children:"resource MOTOR 5 NONE"})}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.code,{children:"resource MOTOR 6 NONE"})}),"\n",(0,r.jsx)(e.p,{children:"CLI commands to assign softserial:"}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.code,{children:"resource serial_tx 11 <pin>"})}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.code,{children:"resource serial_tx 12 <pin>"})}),"\n",(0,r.jsx)(e.p,{children:"NOTE:"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"The OK means it is compatible, and does not warrant it will work when it is configured as a part of a complete system."}),"\n"]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsxs)(e.p,{children:["OMNIBUS(F3) (by"," ",(0,r.jsx)(e.a,{href:"https://github.com/jflyper",children:(0,r.jsx)(e.strong,{children:"@jflyper"})}),")"]}),"\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"Pin"}),(0,r.jsx)(e.th,{children:"Label"}),(0,r.jsx)(e.th,{children:"S.Audio"}),(0,r.jsx)(e.th,{children:"Tramp"}),(0,r.jsx)(e.th,{children:"S.Port"}),(0,r.jsx)(e.th,{children:"Note"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A8"}),(0,r.jsx)(e.td,{children:"LED strip"}),(0,r.jsx)(e.td,{children:"NG"}),(0,r.jsx)(e.td,{children:"NG"}),(0,r.jsx)(e.td,{children:"NG"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B4"}),(0,r.jsx)(e.td,{children:"PPM (*1)"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"When PPM not in use"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B6"}),(0,r.jsx)(e.td,{children:"PWM8/SCL"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"I2C must be de-configured? Need furthe testing."})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B7"}),(0,r.jsx)(e.td,{children:"PWM7/SDA"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"Ditto"})]})]})]}),"\n",(0,r.jsxs)(e.p,{children:[(0,r.jsx)(e.a,{href:"https://github.com/olexs",children:(0,r.jsx)(e.strong,{children:"@olexs"})}),": B07 (PWM7/SDA) works with S.Audio on 3.2, no extra config needed (I2C resources aren't mapped per default)."]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsxs)(e.p,{children:["OMNIBUSF4 (by"," ",(0,r.jsx)(e.a,{href:"https://github.com/jflyper",children:(0,r.jsx)(e.strong,{children:"@jflyper"})}),")"]}),"\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"Pin"}),(0,r.jsx)(e.th,{children:"Label"}),(0,r.jsx)(e.th,{children:"S.Audio"}),(0,r.jsx)(e.th,{children:"Tramp"}),(0,r.jsx)(e.th,{children:"S.Port"}),(0,r.jsx)(e.th,{children:"Note"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A1"}),(0,r.jsx)(e.td,{children:"PWM5"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A8"}),(0,r.jsx)(e.td,{children:"PWM6"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsxs)(e.td,{children:["Tramp report by"," ",(0,r.jsx)(e.a,{href:"https://github.com/llambkin",children:(0,r.jsx)(e.strong,{children:"@llambkin"})})]})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B14"}),(0,r.jsx)(e.td,{children:"PPM"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B15"}),(0,r.jsx)(e.td,{children:"CH2"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"C8"}),(0,r.jsx)(e.td,{children:"CH5"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"C9"}),(0,r.jsx)(e.td,{children:"CH6"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{})]})]})]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsxs)(e.p,{children:["OMNIBUSF4SD (by"," ",(0,r.jsx)(e.a,{href:"https://github.com/jflyper",children:(0,r.jsx)(e.strong,{children:"@jflyper"})}),","," ",(0,r.jsx)(e.a,{href:"https://github.com/antonig",children:(0,r.jsx)(e.strong,{children:"@antonig"})}),")"]}),"\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"Pin"}),(0,r.jsx)(e.th,{children:"Label"}),(0,r.jsx)(e.th,{children:"S.Audio"}),(0,r.jsx)(e.th,{children:"Tramp"}),(0,r.jsx)(e.th,{children:"S.Port"}),(0,r.jsx)(e.th,{children:"Note"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A9"}),(0,r.jsx)(e.td,{children:"TX1"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsxs)(e.td,{children:["OK"," ",(0,r.jsx)(e.a,{href:"https://github.com/stsa64",children:(0,r.jsx)(e.strong,{children:"@stsa64"})})]}),(0,r.jsxs)(e.td,{children:[(0,r.jsx)(e.a,{href:"https://github.com/stsa64",children:(0,r.jsx)(e.strong,{children:"@stsa64"})}),": Smartport does not work if running Tramp on A8 (PWM6) via softserial (timer conflict??)"]})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A1"}),(0,r.jsx)(e.td,{children:"PWM5"}),(0,r.jsxs)(e.td,{children:["OK"," ",(0,r.jsx)(e.a,{href:"https://github.com/basdelfos",children:(0,r.jsx)(e.strong,{children:"@basdelfos"})})]}),(0,r.jsxs)(e.td,{children:["OK"," ",(0,r.jsx)(e.a,{href:"https://github.com/stsa64",children:(0,r.jsx)(e.strong,{children:"@stsa64"})})]}),(0,r.jsxs)(e.td,{children:["OK"," ",(0,r.jsx)(e.a,{href:"https://github.com/basdelfos",children:(0,r.jsx)(e.strong,{children:"@basdelfos"})})]}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A8"}),(0,r.jsx)(e.td,{children:"PWM6"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B14"}),(0,r.jsx)(e.td,{children:"PPM"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B15"}),(0,r.jsx)(e.td,{children:"CH2"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"C8"}),(0,r.jsx)(e.td,{children:"CH5"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"C9"}),(0,r.jsx)(e.td,{children:"CH6"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{})]})]})]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsxs)(e.p,{children:["SPRACINGF3 (by"," ",(0,r.jsx)(e.a,{href:"https://github.com/jflyper",children:(0,r.jsx)(e.strong,{children:"@jflyper"})}),")"]}),"\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"Pin"}),(0,r.jsx)(e.th,{children:"Label"}),(0,r.jsx)(e.th,{children:"S.Audio"}),(0,r.jsx)(e.th,{children:"Tramp"}),(0,r.jsx)(e.th,{children:"S.Port"}),(0,r.jsx)(e.th,{children:"Notes"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A0"}),(0,r.jsx)(e.td,{children:"IO_1[3] PPM/CH1"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"When PPM is not in use"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A1"}),(0,r.jsx)(e.td,{children:"IO_1[4] CH2"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"When PPM is not in use"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B4"}),(0,r.jsx)(e.td,{children:"IO_1[5] CH5"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B5"}),(0,r.jsx)(e.td,{children:"IO_1[6] CH6"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A8"}),(0,r.jsx)(e.td,{children:"IO_1[7] LED strip"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B0"}),(0,r.jsx)(e.td,{children:"IO_2[5] CH7"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B1"}),(0,r.jsx)(e.td,{children:"IO_2[6] CH8"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B8"}),(0,r.jsx)(e.td,{children:"M5"}),(0,r.jsx)(e.td,{children:"NG"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"NG"}),(0,r.jsx)(e.td,{children:"TIM4 crash with M3&M4"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B9"}),(0,r.jsx)(e.td,{children:"M6"}),(0,r.jsx)(e.td,{children:"NG"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"TIM4 crash with M3&M4"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A2"}),(0,r.jsx)(e.td,{children:"M7"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A3"}),(0,r.jsx)(e.td,{children:"M8"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{})]})]})]}),"\n",(0,r.jsxs)(e.p,{children:["Note: Some reports CH1 and CH2 not working: (",(0,r.jsx)(e.a,{href:"https://github.com/betaflight/betaflight/issues/2532#issuecomment-284669276",children:"https://github.com/betaflight/betaflight/issues/2532#issuecomment-284669276"}),")"]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsx)(e.p,{children:"SPRACINGF3EVO"}),"\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"Pin"}),(0,r.jsx)(e.th,{children:"Label"}),(0,r.jsx)(e.th,{children:"S.Audio"}),(0,r.jsx)(e.th,{children:"Tramp"}),(0,r.jsx)(e.th,{children:"S.Port"}),(0,r.jsx)(e.th,{children:"Notes"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A8"}),(0,r.jsx)(e.td,{children:"LED strip"}),(0,r.jsx)(e.td,{children:"NG"}),(0,r.jsx)(e.td,{children:"NG"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:(0,r.jsx)(e.a,{href:"https://github.com/pafleraf",children:(0,r.jsx)(e.strong,{children:"@pafleraf"})})})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B1"}),(0,r.jsx)(e.td,{children:"M8"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:(0,r.jsx)(e.a,{href:"https://github.com/pafleraf",children:(0,r.jsx)(e.strong,{children:"@pafleraf"})})})]})]})]}),"\n",(0,r.jsx)(e.p,{children:"Note: Soft Serial for this target is disabled in bf 3.1.7. However, it works with bf 3.2.0 nightly as of today (2017-05-13)"}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsx)(e.p,{children:"REVOLT"}),"\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"Pin"}),(0,r.jsx)(e.th,{children:"Label"}),(0,r.jsx)(e.th,{children:"S.Audio"}),(0,r.jsx)(e.th,{children:"Tramp"}),(0,r.jsx)(e.th,{children:"S.Port"}),(0,r.jsx)(e.th,{children:"Notes"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B6"}),(0,r.jsx)(e.td,{children:"LED"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"NG"}),(0,r.jsxs)(e.td,{children:[(0,r.jsx)(e.a,{href:"https://github.com/alenl2",children:(0,r.jsx)(e.strong,{children:"@alenl2"})}),"; Need further testing"]})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"C1"}),(0,r.jsx)(e.td,{children:"CRNT"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"NG"}),(0,r.jsxs)(e.td,{children:[(0,r.jsx)(e.a,{href:"https://github.com/alenl2",children:(0,r.jsx)(e.strong,{children:"@alenl2"})}),"; No timer?"]})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A9"}),(0,r.jsx)(e.td,{children:"TX1"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"NG"}),(0,r.jsxs)(e.td,{children:[(0,r.jsx)(e.a,{href:"https://github.com/alenl2",children:(0,r.jsx)(e.strong,{children:"@alenl2"})}),"; Timer conflict? (need checking)"]})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A10"}),(0,r.jsx)(e.td,{children:"RX1"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"NG"}),(0,r.jsxs)(e.td,{children:[(0,r.jsx)(e.a,{href:"https://github.com/alenl2",children:(0,r.jsx)(e.strong,{children:"@alenl2"})}),"; Timer conflict? (need checking)"]})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B10"}),(0,r.jsx)(e.td,{children:"TX3"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"NG"}),(0,r.jsxs)(e.td,{children:[(0,r.jsx)(e.a,{href:"https://github.com/alenl2",children:(0,r.jsx)(e.strong,{children:"@alenl2"})}),"; Timer conflict? (need checking)"]})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B11"}),(0,r.jsx)(e.td,{children:"RX3"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"NG"}),(0,r.jsxs)(e.td,{children:[(0,r.jsx)(e.a,{href:"https://github.com/alenl2",children:(0,r.jsx)(e.strong,{children:"@alenl2"})}),"; Timer conflict? (need checking)"]})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"C6"}),(0,r.jsx)(e.td,{children:"TX6"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:(0,r.jsx)(e.a,{href:"https://github.com/alenl2",children:(0,r.jsx)(e.strong,{children:"@alenl2"})})})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"C7"}),(0,r.jsx)(e.td,{children:"RX6"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:(0,r.jsx)(e.a,{href:"https://github.com/alenl2",children:(0,r.jsx)(e.strong,{children:"@alenl2"})})})]})]})]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsx)(e.p,{children:"KISS (KISSFC)"}),"\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"Pin"}),(0,r.jsx)(e.th,{children:"Label"}),(0,r.jsx)(e.th,{children:"S.Audio"}),(0,r.jsx)(e.th,{children:"Tramp"}),(0,r.jsx)(e.th,{children:"S.Port"}),(0,r.jsx)(e.th,{children:"Notes"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A13"}),(0,r.jsx)(e.td,{children:"PWM5"}),(0,r.jsx)(e.td,{children:"OK (@alenl2)"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsxs)(e.td,{children:["NG"," ",(0,r.jsx)(e.a,{href:"https://github.com/basdelfos",children:(0,r.jsx)(e.strong,{children:"@basdelfos"})}),"/@alenl2"]}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A02"}),(0,r.jsx)(e.td,{children:"PITCH"}),(0,r.jsx)(e.td,{children:"NG (@alenl2)"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsxs)(e.td,{children:["OK"," ",(0,r.jsx)(e.a,{href:"https://github.com/basdelfos",children:(0,r.jsx)(e.strong,{children:"@basdelfos"})}),"/@alenl2"]}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A15"}),(0,r.jsx)(e.td,{children:"ROLL"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:(0,r.jsx)(e.a,{href:"https://github.com/basdelfos",children:(0,r.jsx)(e.strong,{children:"@basdelfos"})})})]})]})]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsx)(e.p,{children:"BLUEJAYF4"}),"\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"Pin"}),(0,r.jsx)(e.th,{children:"Label"}),(0,r.jsx)(e.th,{children:"S.Audio"}),(0,r.jsx)(e.th,{children:"Tramp"}),(0,r.jsx)(e.th,{children:"S.Port"}),(0,r.jsx)(e.th,{children:"Notes"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B00"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"NG (v1)"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"NG"}),(0,r.jsx)(e.td,{children:"staryk@rcg"})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B01"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"NG (v1)"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"NG"}),(0,r.jsx)(e.td,{children:"staryk@rcg"})]})]})]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsx)(e.p,{children:"IRCFUSIONF3"}),"\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"Pin"}),(0,r.jsx)(e.th,{children:"Label"}),(0,r.jsx)(e.th,{children:"S.Audio"}),(0,r.jsx)(e.th,{children:"Tramp"}),(0,r.jsx)(e.th,{children:"S.Port"}),(0,r.jsx)(e.th,{children:"Notes"})]})}),(0,r.jsx)(e.tbody,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A00"}),(0,r.jsx)(e.td,{children:"PPM"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"OK"}),(0,r.jsx)(e.td,{children:"When PPM is not in use"})]})})]}),"\n",(0,r.jsx)(e.hr,{}),"\n",(0,r.jsx)(e.p,{children:"BETAFLIGHTF3"}),"\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"Pin"}),(0,r.jsx)(e.th,{children:"Label"}),(0,r.jsx)(e.th,{children:"S.Audio"}),(0,r.jsx)(e.th,{children:"Tramp"}),(0,r.jsx)(e.th,{children:"S.Port"}),(0,r.jsx)(e.th,{children:"Notes"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B01"}),(0,r.jsx)(e.td,{children:"Soft Serial TX1"}),(0,r.jsx)(e.td,{children:"OK (v1)"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:(0,r.jsx)(e.a,{href:"https://github.com/iwarp",children:(0,r.jsx)(e.strong,{children:"@iwarp"})})})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"A02"}),(0,r.jsx)(e.td,{children:"Soft Serial TX2"}),(0,r.jsx)(e.td,{children:"NG (v1)"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:(0,r.jsx)(e.a,{href:"https://github.com/iwarp",children:(0,r.jsx)(e.strong,{children:"@iwarp"})})})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"B07"}),(0,r.jsx)(e.td,{children:"PPM"}),(0,r.jsx)(e.td,{children:"OK (v1)"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:"?"}),(0,r.jsx)(e.td,{children:(0,r.jsx)(e.a,{href:"https://github.com/iwarp",children:(0,r.jsx)(e.strong,{children:"@iwarp"})})})]})]})]}),"\n",(0,r.jsx)(e.p,{children:(0,r.jsx)(e.a,{href:"http://i.imgur.com/Mh41SmG.jpg",children:"http://i.imgur.com/Mh41SmG.jpg"})}),"\n",(0,r.jsxs)(e.p,{children:["Note (2017-07-27) by"," ",(0,r.jsx)(e.a,{href:"https://github.com/jflyper",children:(0,r.jsx)(e.strong,{children:"@jflyper"})}),": BETAFLIGHTF3 had a timer assignment problem with pre-3.2 firmware. It is fixed with 3.2, and PB01 and A02 should work as software serial --- need to be verified\n(29/10/17) by"," ",(0,r.jsx)(e.a,{href:"https://github.com/iwarp",children:(0,r.jsx)(e.strong,{children:"@iwarp"})})," B01 confirmed working on 3.2.1"]})]})}function x(d={}){const{wrapper:e}={...(0,t.a)(),...d.components};return e?(0,r.jsx)(e,{...d,children:(0,r.jsx)(j,{...d})}):j(d)}},11151:(d,e,s)=>{s.d(e,{Z:()=>h,a:()=>n});var r=s(67294);const t={},i=r.createContext(t);function n(d){const e=r.useContext(i);return r.useMemo((function(){return"function"==typeof d?d(e):{...e,...d}}),[e,d])}function h(d){let e;return e=d.disableParentContext?"function"==typeof d.components?d.components(t):d.components||t:n(d.components),r.createElement(i.Provider,{value:e},d.children)}}}]);