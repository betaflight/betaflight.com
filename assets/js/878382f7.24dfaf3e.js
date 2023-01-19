"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1610],{3905:(e,t,o)=>{o.d(t,{Zo:()=>p,kt:()=>m});var r=o(67294);function a(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function n(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function i(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?n(Object(o),!0).forEach((function(t){a(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):n(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function s(e,t){if(null==e)return{};var o,r,a=function(e,t){if(null==e)return{};var o,r,a={},n=Object.keys(e);for(r=0;r<n.length;r++)o=n[r],t.indexOf(o)>=0||(a[o]=e[o]);return a}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(r=0;r<n.length;r++)o=n[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(a[o]=e[o])}return a}var l=r.createContext({}),h=function(e){var t=r.useContext(l),o=t;return e&&(o="function"==typeof e?e(t):i(i({},t),e)),o},p=function(e){var t=h(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var o=e.components,a=e.mdxType,n=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=h(o),d=a,m=u["".concat(l,".").concat(d)]||u[d]||c[d]||n;return o?r.createElement(m,i(i({ref:t},p),{},{components:o})):r.createElement(m,i({ref:t},p))}));function m(e,t){var o=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var n=o.length,i=new Array(n);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,i[1]=s;for(var h=2;h<n;h++)i[h]=o[h];return r.createElement.apply(null,i)}return r.createElement.apply(null,o)}d.displayName="MDXCreateElement"},97865:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>u,frontMatter:()=>n,metadata:()=>s,toc:()=>h});var r=o(87462),a=(o(67294),o(3905));const n={},i=void 0,s={unversionedId:"old/tuning/Deep-Dive",id:"old/tuning/Deep-Dive",title:"Deep-Dive",description:"Introduction",source:"@site/docs/old/tuning/Deep-Dive.md",sourceDirName:"old/tuning",slug:"/old/tuning/Deep-Dive",permalink:"/docs/old/tuning/Deep-Dive",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"D_MIN",permalink:"/docs/old/tuning/D_MIN"},next:{title:"Feed-Forward-2.0",permalink:"/docs/old/tuning/Feed-Forward-2.0"}},l={},h=[{value:"Introduction",id:"introduction",level:2},{value:"Contents",id:"contents",level:2},{value:"How Opensource Software Development Works",id:"how-opensource-software-development-works",level:2},{value:"Gyro based loop implementation",id:"gyro-based-loop-implementation",level:2},{value:"The delta_from_gyro setting and all about the PID Controller D values",id:"the-delta_from_gyro-setting-and-all-about-the-pid-controller-d-values",level:2},{value:"Additional information",id:"additional-information",level:3},{value:"Filtering, Aliasing and Gyro Sync explained",id:"filtering-aliasing-and-gyro-sync-explained",level:2},{value:"Rates rc rate translations into deg sec Tables",id:"rates-rc-rate-translations-into-deg-sec-tables",level:2},{value:"Motor update",id:"motor-update",level:2}],p={toc:h};function u(e){let{components:t,...o}=e;return(0,a.kt)("wrapper",(0,r.Z)({},p,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"introduction"},"Introduction"),(0,a.kt)("p",null,"The purpose of this page is to provide the reader with detailed information about the inner workings of the BetaFlight firmware. This information has been collected from sources such as:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"The BetaFlight RC Groups Forum (credit will be given where possible)."),(0,a.kt)("li",{parentName:"ul"},"YouTube Channels that have provided relevant content.")),(0,a.kt)("p",null,"Grab a snack and make yourself comfortable ! ",(0,a.kt)("img",{parentName:"p",src:"http://static.rcgroups.com/forums/images/smilies/popcorn.gif",alt:"Popcorn"})),(0,a.kt)("h2",{id:"contents"},"Contents"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"#how-opensource-software-development-works"},"How Opensource Software Development Works")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"#gyro-based-loop-implementation"},"Gyro based loop implementation")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"#the-delta_from_gyro-setting-and-all-about-the-pid-controller-d-values"},"The delta_from_gyro setting and all about the PID Controller D values")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"#filtering-aliasing-and-gyro-sync-explained"},"Filtering, Aliasing and Gyro Sync explained")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"#rates-rc-rate-translations-into-deg-sec-tables"},"Rates / rc rate translations into deg/sec Tables")),(0,a.kt)("li",{parentName:"ol"},(0,a.kt)("a",{parentName:"li",href:"#motor-update"},"Motor update"))),(0,a.kt)("h2",{id:"how-opensource-software-development-works"},"How Opensource Software Development Works"),(0,a.kt)("p",null,"This video covers how multiple versions of the same software in the hobby exist (CleanFlight/BetaFlight/RaceFlight etc) and how developers exchange ideas and promote code between the projects."),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"http://www.youtube.com/watch?v=kZvoei1dzNQ"},"http://www.youtube.com/watch?v=kZvoei1dzNQ")),(0,a.kt)("h2",{id:"gyro-based-loop-implementation"},"Gyro based loop implementation"),(0,a.kt)("p",null,"Gyro update is leading the loop. The loop will start after interrupt is triggered for new gyro sample. The PID controller will always be doing the calculation of the most fresh gyro value. The sampling gyro rate of 1khz will be used and that will automatically run looptimes of 1000us or 500us depending of configuration and target capabilities. This also makes the looptime setting unnecessary. There is no need for this parameter as our gyro decides when loop will run. There is no drift between gyro and control loop and your PID tune will be consistent. No aliasing should be experienced. This also helps filters to do better job in giving clean gyro traces."),(0,a.kt)("p",null,(0,a.kt)("img",{parentName:"p",src:"https://cloud.githubusercontent.com/assets/10757508/9105588/6714334c-3c19-11e5-922c-1f70d46d29ac.png",alt:"GYRO_SYNC"})),(0,a.kt)("h2",{id:"the-delta_from_gyro-setting-and-all-about-the-pid-controller-d-values"},"The delta_from_gyro setting and all about the PID Controller D values"),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Boris B wrote:")),(0,a.kt)("p",null,"On = delta from measurement / gyro"),(0,a.kt)("p",null,"Off = delta from error"),(0,a.kt)("p",null,"It is really hard to explain without reading a lot about pid controllers and how they really work."),(0,a.kt)("p",null,'But here\'s my attempt for a quick and "easy" to understand explanation:'),(0,a.kt)("p",null,"Before explaining I will first tell you what determines the Dterm part of PIDsum. It is the derivative or, in other words, rate of change. It is basically the speed of something."),(0,a.kt)("p",null,"Lets say you're driving at a constant speed of 50km/h, then your speed derivative is 0. But when you push the pedal and keep accelerating and start speeding up with 5km/h per second then the derivative of your speed is 5. When you start slowing down, your speed derivative goes negative."),(0,a.kt)("p",null,"Delta from error:\nThis is the classical Derivative approach. It reflects the speed of error. Error is derived from stick input. Once you move the stick you introduce an error and PID controller has to correct the error. The faster the error grows the the bigger derivative gets. It helps PID loop to reach target faster. It is accelerating it more what creates the dampening effect."),(0,a.kt)("p",null,"Delta from measurement/gyro:\nThis is mathematically simplified formula for Derivative from error assuming that error is 0.\nWhen you leave out error out of the formula as it is 0 anyway that there is just -(measurement delta) left. And this is the speed of change from gyro. The faster the gyro grows in positive direction the higher Dterm part will be in opposite direction.\nThis has a direct dampening effect to P."),(0,a.kt)("p",null,"The main difference is that Delta from error kind of accelerates your stick input, but also creates derivative kick because it follows the stick which is slower refresh rate and delta from gyro doesn't accelerate your stick input at all and doesn't create derivative kick."),(0,a.kt)("hr",null),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"ctzsnooze wrote:")),(0,a.kt)("p",null,"Actually, Dterm in gyro mode is inversely proportional to the rate of change of the gyro signal. It always opposes changes to the gyro signal. Frame inertia delays the response of the gyros to P changes, but since Dterm always opposed gyro changes, it typically is opposite in sign to Pterm (definitely opposite in sign to Dterm."),(0,a.kt)("p",null,"When Pterm increases due to positive stick inputs, inertia of the quad initially results in a big Pterm error signal. Initially, the quad isn't moving, due to inertial mass. With no movement, Dterm is zero, while Pterm is quite large. Very quickly the motors spool up and start to rotate the quad, reducing Pterm as the rotation rate reaches target (i.e. as error falls). Dterm slows down the onset of the rotation, smoothing out both the start of the rotation and the end of the roll. But Pterm is always stronger, so the quad eventually gets the desired rotation rate. Because the rate of rotation is now constant, both Pterm and Dterm head to to zero. Momentum may cause the frame to keep rotating a bit past the point at which it was supposed to stop. P weakly opposes this since typically the actual magnitude of the offset due to momentum errors is small, but Dterm is very sensitive to the high velocity of Pterm overshoots and damps them away much more quickly than Pterm can."),(0,a.kt)("p",null,"In the absence of stick movement, Pterm opposes an external force on the frame. The magnitude of the Pterm response is always in proportion to the error between the intended rotation rate and the measured rotation rate (e.g. unwanted rotation from flying into a gust of wind)."),(0,a.kt)("p",null,"When there is a positive stick movement, the positive rcCommand will result in a sudden negative error because the frame won't be rotating as fast as the new value for rcCommand requests - at least immediately it won't. That causes a small spike up in Pterm that can be seen with every positive rcCommand step. This is what it means to say that P term is error based . As a result, PTerm changes in the same direction as rcCommand with stick inputs. Once the frame starts to rotate at the desired rotation rate, the Pterm error falls, and reaches zero when it is rotating at the desired speed."),(0,a.kt)("p",null,"When Dterm is gyro based, it is proportional to the rate of change of the gyro signal, and opposite in sign. A non-error based Dterm doesn't care about stick inputs. It just opposes the rate of change of gyro - smoothing out sudden changes in rate, however they arise. While mathematically a derivative, it acts as a damping mechanism for oscillations, like the shock absorber in a car's suspension."),(0,a.kt)("p",null,"While a gyro based Dterm will be delayed a little behind Pterm due to frame inertia, it will typically be of opposite sign to Pterm during stick inputs."),(0,a.kt)("hr",null),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"ctzsnooze wrote:")),(0,a.kt)("p",null,"Dterm can be calculated on rate of change of gyro signal alone, or the error from rcCommand to gyros."),(0,a.kt)("p",null,"The former approach was first used in Lux, whereas multiwii and Rewrite Dterm were historically error based."),(0,a.kt)("p",null,"Until recently, BetaFlight used error based Dterm calculations, but as of 2.3.4 Boris has gone back to the original Lux approach where Dterm is derived only from rate of change of the gyro signal."),(0,a.kt)("p",null,"Dterm fundamentally opposes changes in gyros, and opposes fast changes more than slow changes. If you hand hold your quad in acro mode and, without stick input, suddenly tilt it a tiny bit, but very, very quickly, the immediate opposition to that sudden small change is coming almost entirely from Dterm."),(0,a.kt)("p",null,"The two methods behave exactly the same in the absence of stick inputs, but differ markedly when a control input results in a sudden 'error' between current roll rate and the new intended roll rate."),(0,a.kt)("p",null,"When D is based on error, a strong 'dterm kick' happens when rcCommand suddenly changes the error value. The kick is usually in phase with the desired outcome, and speeds up the response to stick inputs, because the kick typically overrides the usual Dterm response of opposing movement. However the kick effect causes 'spikes' on the Dterm trace, smaller with Sbus but big on PPM. Dealing with those spikes was the main reason why rcSmoothing was implemented - it removes the spikes, but retains the 'kick' effect."),(0,a.kt)("p",null,"During a sudden stick input, the quad will respond a bit quicker if Dterm is error seeking because D will not oppose the movement resulting from your stick inputs. Whether this is noticeable is unclear, but theoretically it should be a bit more responsive."),(0,a.kt)("p",null,"There is a possible downside, however, in that that wobble after sudden stick inputs (e.g. at the end of a roll) may be less of a problem when Dterm is not error seeking. Additionally if the 'kicks' aren't smoothed they can cause noise in motors during stick inputs, reducing efficiency, and since RC smoothing to smooth them out may cause delays or otherwise be problematic, I think Boris is keen to revisit which approach is best."),(0,a.kt)("p",null,"It might be useful, purely for testing purposes, if we could select the Dterm calculation mode via a switch, so we could change the functionality in flight to really see if it makes much of a difference. Or change it via a CLI parameter. Otherwise its a bit difficult to really know which approach is best, you have to reflash with a custom version and then it's not so easy to compare one to the other."),(0,a.kt)("p",null,"But yeah, with big stick inputs, the new Dterm approach will be smoother on BlackBox during the input, and will always be out of phase with gyros so may delay responsiveness a little to Pterm during stick inputs. It could be that a small increase in P will override the loss of Dterm kick. If so it is tempting to no longer use the error seeking Dterm calculation."),(0,a.kt)("h3",{id:"additional-information"},"Additional information"),(0,a.kt)("p",null,"Effect of D term on P/D controller: ",(0,a.kt)("a",{parentName:"p",href:"http://www.youtube.com/watch?v=xMygUvegC80"},"http://www.youtube.com/watch?v=xMygUvegC80")),(0,a.kt)("p",null,"General explanation of D term: ",(0,a.kt)("a",{parentName:"p",href:"http://en.wikipedia.org/wiki/Derivative"},"http://en.wikipedia.org/wiki/Derivative")),(0,a.kt)("h2",{id:"filtering-aliasing-and-gyro-sync-explained"},"Filtering, Aliasing and Gyro Sync explained"),(0,a.kt)("p",null,"The following videos have been produced with BetaFlight in mind, and provide a great resource for in-depth learning of these complex subjects."),(0,a.kt)("p",null,"Filtering Basics: ",(0,a.kt)("a",{parentName:"p",href:"http://www.youtube.com/watch?v=CpW8_fOJ7_M"},"http://www.youtube.com/watch?v=CpW8_fOJ7_M")),(0,a.kt)("p",null,"Nuhertz Spectra for analyzing copter gyro data: ",(0,a.kt)("a",{parentName:"p",href:"http://www.youtube.com/watch?v=fZm9N-WFkQk"},"http://www.youtube.com/watch?v=fZm9N-WFkQk")),(0,a.kt)("p",null,"Analyzing FFT graphs for multirotor tuning: ",(0,a.kt)("a",{parentName:"p",href:"http://www.youtube.com/watch?v=nxHK-V7GCYY"},"http://www.youtube.com/watch?v=nxHK-V7GCYY")),(0,a.kt)("p",null,"Aliasing and Gyro Sync Explained: ",(0,a.kt)("a",{parentName:"p",href:"http://www.youtube.com/watch?v=-lmoKal_e4s"},"http://www.youtube.com/watch?v=-lmoKal_e4s")),(0,a.kt)("p",null,"New Biquad filter in BetaFlight V2.3.x: ",(0,a.kt)("a",{parentName:"p",href:"http://www.youtube.com/watch?v=Q2tSWU1MsVk"},"http://www.youtube.com/watch?v=Q2tSWU1MsVk")),(0,a.kt)("h2",{id:"rates-rc-rate-translations-into-deg-sec-tables"},"Rates rc rate translations into deg sec Tables"),(0,a.kt)("p",null,"Boris posted Tables in:"),(0,a.kt)("p",null,"Effect of rate combined with static rc rate of 100. (rc rate doesn't affect yaw). Full Stick input\n",(0,a.kt)("a",{parentName:"p",href:"http://www.rcgroups.com/forums/showpost.php?p=34028934&postcount=18514"},"http://www.rcgroups.com/forums/showpost.php?p=34028934&postcount=18514")),(0,a.kt)("p",null,"Effect of rc rate with static rate of 0. Full stick input\n",(0,a.kt)("a",{parentName:"p",href:"http://www.rcgroups.com/forums/showpost.php?p=34028937&postcount=18515"},"http://www.rcgroups.com/forums/showpost.php?p=34028937&postcount=18515")),(0,a.kt)("p",null,"and to make it complete. Only effect of yaw rate\n",(0,a.kt)("a",{parentName:"p",href:"http://www.rcgroups.com/forums/showpost.php?p=34028986&postcount=18516"},"http://www.rcgroups.com/forums/showpost.php?p=34028986&postcount=18516")),(0,a.kt)("h2",{id:"motor-update"},"Motor update"),(0,a.kt)("p",null,"I am also coming from the world of VOIP what is completaly different than control laws, but there jitter is even much more of an issue in realtime audio/video processing. There are several ways to deal with it. Another option would be dropping motor output signals when they come to soon....before the old signal finished. That would be the only other option."),(0,a.kt)("p",null,"Another example: The new way runs cycletime of 125us and PID loop of 375us\nThe motor update happens at begin of the new cycletime and not the begin of new PID looptime!"),(0,a.kt)("p",null,"Start GYRO/PID loop------\x3e+125us GYRO/MOTOR-----\x3e+125us GYRO----\x3e +125 PID/GYRO-------\x3e+125 GYRO/MOTOR (375us)"),(0,a.kt)("p",null,"Having faster motor rate than loop rate is complete nonsense as the value will still be overwritten and cause jittering.\nThats why i am reworking the tasking at the moment.\nThe ideal motor handling would be to only write motors when there are new mixer calculations available and with the time interval between the motor updates never lower than the desired period. Longer motor updates are even not bad just as long as next motor update doesnt fall into previous one."),(0,a.kt)("p",null,"Lets say the pid controller / mixer requests full motor power on oneshot125 which is about 250us PWM interval.....if we were updating motors at 2k interval than there is in total 250us free interval where it doesnt matter when you update it. so allowed jitter period is a bit less than 250us."),(0,a.kt)("p",null,"On 4k speed the motor update period is totally not allowed to jitter to make full throttle possible."),(0,a.kt)("p",null,"It doesnt matter if the motor gets updated too late but should never be updated too soon."),(0,a.kt)("p",null,"With low looptimes like now we are reaching the point where motor updates happen near the end of cycletime. So there is no such thing as delay there. It doesnt matter if you do something at the end or beginning.\nImagine like running circles you can't tell what is begin or end. The order doesnt matter anymore."),(0,a.kt)("p",null,"It's near the end of the cycletime where there is the most jitter. The time variations there are between 0 and 100us. Especially on low looptimes with scheduled tasking mechanism to get the maximum efficiency the end of loop cycle is really jittery.\nSo when moving the motor update to the beginning of the loop you always have the constant timing. The variable delay you would have when writing the motors at the end of the loop now becomes a constant delay."),(0,a.kt)("p",null,"Jitter is quite crucial on oneshot signals as period of 60us is almost a half oneshot signal."))}u.isMDXComponent=!0}}]);