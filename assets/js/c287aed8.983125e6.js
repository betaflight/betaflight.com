"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9236],{3905:(e,t,n)=>{n.d(t,{Zo:()=>d,kt:()=>m});var a=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},p="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),p=u(n),c=i,m=p["".concat(s,".").concat(c)]||p[c]||h[c]||o;return n?a.createElement(m,r(r({ref:t},d),{},{components:n})):a.createElement(m,r({ref:t},d))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:i,r[1]=l;for(var u=2;u<o;u++)r[u]=n[u];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},62568:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>p,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var a=n(87462),i=(n(67294),n(3905));const o={sidebar_position:1,sidebar_label:"Development"},r="Welcome to the Development Section",l={unversionedId:"development/development",id:"development/development",title:"Welcome to the Development Section",description:"Find Everything Betaflight Related",source:"@site/docs/development/development.mdx",sourceDirName:"development",slug:"/development/",permalink:"/docs/development/",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1,sidebar_label:"Development"},sidebar:"development",next:{title:"Bus and External Device Drivers",permalink:"/docs/development/API/BusDrivers"}},s={},u=[{value:"Find Everything Betaflight Related",id:"find-everything-betaflight-related",level:2},{value:"Contributing",id:"contributing",level:2},{value:"Development",id:"development",level:2},{value:"Translators",id:"translators",level:2},{value:"General Principles",id:"general-principles",level:2},{value:"Unit Testing",id:"unit-testing",level:2},{value:"Running The Tests.",id:"running-the-tests",level:3},{value:"Using Git and Github",id:"using-git-and-github",level:2},{value:"Providing Test Targets for Pull Requests",id:"providing-test-targets-for-pull-requests",level:3},{value:"IDEs and .gitignore",id:"ides-and-gitignore",level:3},{value:"Building a hex file locally",id:"building-a-hex-file-locally",level:3},{value:"Custom Defaults - for Developers - DEBUGGER USE ONLY",id:"custom-defaults---for-developers---debugger-use-only",level:3}],d={toc:u};function p(e){let{components:t,...o}=e;return(0,i.kt)("wrapper",(0,a.Z)({},d,o,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"welcome-to-the-development-section"},"Welcome to the Development Section"),(0,i.kt)("h2",{id:"find-everything-betaflight-related"},"Find Everything Betaflight Related"),(0,i.kt)("admonition",{title:"Work in progress",type:"caution"},(0,i.kt)("p",{parentName:"admonition"},"This site is still new. Very new. As of writing this, it's only 5 days since we started working on it.\nSo it's still very much a work in progress. Pages going to be added, updated and improved pretty every day\nin the weeks to come. So if you're missing something, please be patient. It will come! You can also help\nus out, check out the ",(0,i.kt)("inlineCode",{parentName:"p"},"#documentation")," channel on the ",(0,i.kt)("a",{parentName:"p",href:"https://discord.betaflight.com/invite"},"Discord server"),"\nfor more info.")),(0,i.kt)("h2",{id:"contributing"},"Contributing"),(0,i.kt)("p",null,"Contributions are welcome and encouraged. You can contribute in many ways:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"implement a new feature in the firmware or in configurator (see ",(0,i.kt)("a",{parentName:"li",href:"#Developers"},"below"),");"),(0,i.kt)("li",{parentName:"ul"},"documentation updates and corrections;"),(0,i.kt)("li",{parentName:"ul"},"How-To guides - received help? Help others!"),(0,i.kt)("li",{parentName:"ul"},"bug reporting & fixes;"),(0,i.kt)("li",{parentName:"ul"},"new feature ideas & suggestions;"),(0,i.kt)("li",{parentName:"ul"},"provide a new translation for configurator, or help us maintain the existing ones (see ",(0,i.kt)("a",{parentName:"li",href:"#Translators"},"below"),").")),(0,i.kt)("p",null,"The best place to start is the Betaflight Slack (registration ",(0,i.kt)("a",{parentName:"p",href:"https://slack.betaflight.com/"},"here"),"). Next place is the github issue tracker:"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/betaflight/betaflight/issues"},"https://github.com/betaflight/betaflight/issues"),"\n",(0,i.kt)("a",{parentName:"p",href:"https://github.com/betaflight/betaflight-configurator/issues"},"https://github.com/betaflight/betaflight-configurator/issues")),(0,i.kt)("p",null,"Before creating new issues please check to see if there is an existing one, search first otherwise you waste people's time when they could be coding instead!"),(0,i.kt)("p",null,"If you want to contribute to our efforts financially, please consider making a donation to us through ",(0,i.kt)("a",{parentName:"p",href:"https://paypal.me/betaflight"},"PayPal"),"."),(0,i.kt)("p",null,"If you want to contribute financially on an ongoing basis, you should consider becoming a patron for us on ",(0,i.kt)("a",{parentName:"p",href:"https://www.patreon.com/betaflight"},"Patreon"),"."),(0,i.kt)("h2",{id:"development"},"Development"),(0,i.kt)("p",null,"This document is primarily for developers."),(0,i.kt)("p",null,"Contribution of bugfixes and new features is encouraged. Please be aware that we have a thorough review process for pull requests, and be prepared to explain what you want to achieve with your pull request.\nBefore starting to write code, please read this document and the ",(0,i.kt)("a",{parentName:"p",href:"/docs/development/CodingStyle"},"coding style definition"),"."),(0,i.kt)("p",null,"GitHub actions are used to run automatic builds"),(0,i.kt)("h2",{id:"translators"},"Translators"),(0,i.kt)("p",null,"We want to make Betaflight accessible for pilots who are not fluent in English, and for this reason we are currently maintaining translations into 21 languages for Betaflight Configurator: Catal\xe0, Dansk, Deutsch, Espa\xf1ol, Euskera, Fran\xe7ais, Galego, Hrvatski, Bahasa Indonesia, Italiano, \u65e5\u672c\u8a9e, \ud55c\uad6d\uc5b4, Latvie\u0161u, Portugu\xeas, Portugu\xeas Brasileiro, polski, \u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u044f\u0437\u044b\u043a, Svenska, \u7b80\u4f53\u4e2d\u6587, \u7e41\u9ad4\u4e2d\u6587.\nWe have got a team of volunteer translators who do this work, but additional translators are always welcome to share the workload, and we are keen to add additional languages. If you would like to help us with translations, you have got the following options:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"if you help by suggesting some updates or improvements to translations in a language you are familiar with, head to ",(0,i.kt)("a",{parentName:"li",href:"https://crowdin.com/project/betaflight-configurator"},"crowdin")," and add your suggested translations there;"),(0,i.kt)("li",{parentName:"ul"},"if you would like to start working on the translation for a new language, or take on responsibility for proof-reading the translation for a language you are very familiar with, please head to the Betaflight Discord chat (registration ",(0,i.kt)("a",{parentName:"li",href:"https://discord.gg/n4E6ak4u3c"},"here"),"), and join the ",(0,i.kt)("a",{parentName:"li",href:"https://discord.com/channels/868013470023548938/1057773726915100702"},"'translation'")," channel - the people in there can help you to get a new language added, or set you up as a proof reader.")),(0,i.kt)("h2",{id:"general-principles"},"General Principles"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Name everything well."),(0,i.kt)("li",{parentName:"ol"},"Strike a balance between simplicity and not-repeating code."),(0,i.kt)("li",{parentName:"ol"},"Methods that start with the word 'find' can return a null, methods that start with 'get' should not."),(0,i.kt)("li",{parentName:"ol"},"Keep methods short - it makes it easier to test."),(0,i.kt)("li",{parentName:"ol"},"Don't be afraid of moving code to a new file - it helps to reduce test dependencies."),(0,i.kt)("li",{parentName:"ol"},"Avoid noise-words in variable names, like 'data' or 'info'. Think about what you're naming and name it well. Don't be afraid to rename anything."),(0,i.kt)("li",{parentName:"ol"},"Avoid comments that describe what the code is doing, the code should describe itself. Comments are useful however for big-picture purposes and to document content of variables."),(0,i.kt)("li",{parentName:"ol"},"If you need to document a variable do it at the declaration, don't copy the comment to the ",(0,i.kt)("inlineCode",{parentName:"li"},"extern")," usage since it will lead to comment rot."),(0,i.kt)("li",{parentName:"ol"},"Seek advice from other developers - know you can always learn more."),(0,i.kt)("li",{parentName:"ol"},"Be professional - attempts at humor or slating existing code in the codebase itself is not helpful when you have to change/fix it."),(0,i.kt)("li",{parentName:"ol"},"Know that there's always more than one way to do something and that code is never final - but it does have to work.")),(0,i.kt)("p",null,"It is also advised to read about clean code, here are some useful links:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"http://cleancoders.com/"},"http://cleancoders.com/")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"http://en.wikipedia.org/wiki/SOLID_%28object-oriented_design%29"},"http://en.wikipedia.org/wiki/SOLID_%28object-oriented_design%29")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"http://en.wikipedia.org/wiki/Code_smell"},"http://en.wikipedia.org/wiki/Code_smell")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"http://en.wikipedia.org/wiki/Code_refactoring"},"http://en.wikipedia.org/wiki/Code_refactoring")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"http://www.amazon.co.uk/Working-Effectively-Legacy-Robert-Martin/dp/0131177052"},"http://www.amazon.co.uk/Working-Effectively-Legacy-Robert-Martin/dp/0131177052"))),(0,i.kt)("h2",{id:"unit-testing"},"Unit Testing"),(0,i.kt)("p",null,"Ideally, there should be tests for any new code. However, since this is a legacy codebase which was not designed to be tested this might be a bit difficult."),(0,i.kt)("p",null,"If you want to make changes and want to make sure it's tested then focus on the minimal set of changes required to add a test."),(0,i.kt)("p",null,"Tests currently live in the ",(0,i.kt)("inlineCode",{parentName:"p"},"test")," folder and they use the google test framework.\nThe tests are compiled and run natively on your development machine and not on the target platform.\nThis allows you to develop tests and code and actually execute it to make sure it works without needing a development board or simulator."),(0,i.kt)("p",null,"This project could really do with some functional tests which test the behaviour of the application."),(0,i.kt)("p",null,"All pull requests to add/improve the testability of the code or testing methods are highly sought!"),(0,i.kt)("p",null,"Note: Tests are written in C++ and linked with with firmware's C code. All code is also instrumented using gcov to make test coverage analysis possible."),(0,i.kt)("h3",{id:"running-the-tests"},"Running The Tests."),(0,i.kt)("p",null,"The tests and test build system is very simple and based off the googletest example files, it will be improved in due course. From the root folder of the project simply do:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"make test\n")),(0,i.kt)("p",null,"You can also do:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"make junittest\n")),(0,i.kt)("p",null,"This will build a set of executable files in the ",(0,i.kt)("inlineCode",{parentName:"p"},"obj/test")," folder, one for each ",(0,i.kt)("inlineCode",{parentName:"p"},"*_unittest.cc")," file.\nIt will stop after first compile/build error. If you want it to continue with the next test module you can use ",(0,i.kt)("inlineCode",{parentName:"p"},"make -k test"),"."),(0,i.kt)("p",null,'After they have been executed by the make invocation, you can still run them on the command line to execute the tests and to see the test report. Test reports will also be produced in form of junit XML files, if tests are built and run with the "junittest" goal. Junit report files are saved in obj/test directory and has the following naming pattern test_name_results.xml, for example: obj/test/battery_unittest_results.xml'),(0,i.kt)("p",null,"You can also step-debug the tests in eclipse and you can use the GoogleTest test runner to make building and re-running the tests simple."),(0,i.kt)("p",null,"The tests are currently always compiled with debugging information enabled, there may be additional warnings, if you see any warnings please attempt to fix them and submit pull requests with the fixes."),(0,i.kt)("p",null,"Tests are verified and working with GCC 4.9.3"),(0,i.kt)("h2",{id:"using-git-and-github"},"Using Git and Github"),(0,i.kt)("p",null,"Ensure you understand the github workflow: ",(0,i.kt)("a",{parentName:"p",href:"https://guides.github.com/introduction/flow/index.html"},"https://guides.github.com/introduction/flow/index.html")),(0,i.kt)("p",null,"Please keep pull requests focused on one thing only, since this makes it easier to merge and test in a timely manner."),(0,i.kt)("p",null,"If you need help with pull requests there are guides on github here:"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://help.github.com/articles/creating-a-pull-request/"},"https://help.github.com/articles/creating-a-pull-request/")),(0,i.kt)("p",null,"The main flow for a contributing is as follows:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Login to github, go to the betaflight repository and press ",(0,i.kt)("inlineCode",{parentName:"li"},"fork"),";"),(0,i.kt)("li",{parentName:"ol"},"Then using the command line/terminal on your computer: ",(0,i.kt)("inlineCode",{parentName:"li"},"git clone <url to YOUR fork>"),";"),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"cd betaflight"),";"),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"git checkout master"),";"),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"git checkout -b my-new-code"),";"),(0,i.kt)("li",{parentName:"ol"},"Make changes;"),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"git add <files that have changed>"),";"),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"git commit"),";"),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"git push origin my-new-code"),";"),(0,i.kt)("li",{parentName:"ol"},"Create pull request using github UI to merge your changes from your new branch into ",(0,i.kt)("inlineCode",{parentName:"li"},"betaflight/master"),";"),(0,i.kt)("li",{parentName:"ol"},"Repeat from step 4 for new other changes.")),(0,i.kt)("p",null,"The primary thing to remember is that separate pull requests should be created for separate branches. Never create a pull request from your ",(0,i.kt)("inlineCode",{parentName:"p"},"master")," branch."),(0,i.kt)("p",null,"Once you have created the PR,\nevery new commit/push in your branch will propagate from your fork into the PR in the main github/betaflight repo.\nCheckout another branch first if you want something else."),(0,i.kt)("p",null,"Push will often fail if you edit or squash commits in a branch already pushed. Never do such things after creating the PR."),(0,i.kt)("p",null,"Later, you can get the changes from the betaflight repo into your ",(0,i.kt)("inlineCode",{parentName:"p"},"master")," branch by adding betaflight as a git remote and merging from it as follows:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"git remote add betaflight https://github.com/betaflight/betaflight.git")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"git checkout master")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"git fetch betaflight")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"git merge betaflight/master")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"git push origin master")," is an optional step that will update your fork on github")),(0,i.kt)("p",null,"You can also perform the git commands using the git client inside Eclipse. Refer to the Eclipse git manual."),(0,i.kt)("h3",{id:"providing-test-targets-for-pull-requests"},"Providing Test Targets for Pull Requests"),(0,i.kt)("p",null,"If you open a pull request for the betaflight repository that contains a change that can be tested by other users, please build a set of test firmware files for all Unified Targets and attach them to the pull request. The required firmware files can be built in zipped form ready for upload to GitHub with ",(0,i.kt)("inlineCode",{parentName:"p"},"make unified_zip"),". When attaching test firmware files, you can point users to this video for instructions on how to install the test firmware: ",(0,i.kt)("a",{parentName:"p",href:"https://youtu.be/I1uN9CN30gw"},"https://youtu.be/I1uN9CN30gw")),(0,i.kt)("p",null,"Example of a pull request with test firmware attached:"),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Pull request with test targets",src:n(35943).Z,width:"557",height:"222"})),(0,i.kt)("h3",{id:"ides-and-gitignore"},"IDEs and .gitignore"),(0,i.kt)("p",null,"The projects ",(0,i.kt)("a",{parentName:"p",href:"/.gitignore"},".gitignore")," already ignores certain artifacts from some IDEs, but if you'd like to use something else, you can set up git to ignore the necessary files at a global level (all git projects on the computer)"),(0,i.kt)("p",null,"It is always good to check that you haven't done this already: ",(0,i.kt)("inlineCode",{parentName:"p"},"git config --global --get core.excludesfile")),(0,i.kt)("p",null,"For Linux/BSD/OSX: ",(0,i.kt)("inlineCode",{parentName:"p"},"git config --global core.excludesfile '~/.gitignore'")),(0,i.kt)("p",null,"For Windows: ",(0,i.kt)("inlineCode",{parentName:"p"},"git config --global core.excludesfile '%USERPROFILE%\\.gitignore'")),(0,i.kt)("p",null,"When you ",(0,i.kt)("inlineCode",{parentName:"p"},"git config --global --get core.excludesfile")," a second time, you should get a file location back."),(0,i.kt)("h3",{id:"building-a-hex-file-locally"},"Building a hex file locally"),(0,i.kt)("p",null,"Given the roll out of the CLOUD BUILD platform, there is a need for those of you who want to build locally to add in the options for selecting the features you want. Surprisingly this has always been there in the form of the ",(0,i.kt)("inlineCode",{parentName:"p"},"EXTRA_FLAGS")," command line parameter for ",(0,i.kt)("inlineCode",{parentName:"p"},"make"),". The cloud building platform merely makes use of this parameter - extensively."),(0,i.kt)("p",null,"The best way to demonstrate this is to give an example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'make TARGET=STM32F411 EXTRA_FLAGS="-DUSE_GPS -DUSE_LED_STRIP"\n')),(0,i.kt)("p",null,"The above would make a F411 target hex with GPS and LED_STRIP included. Happy compiling! :). For the most part simply ",(0,i.kt)("inlineCode",{parentName:"p"},"make")," with the MCU target will include almost everytihing. The exception is the lower flash MCUs, e.g. F411 and F722. These do not have the flash space for everything, so even building locally you will need to specify what you would like included."),(0,i.kt)("admonition",{type:"note"},(0,i.kt)("p",{parentName:"admonition"},"Please note the use of ",(0,i.kt)("inlineCode",{parentName:"p"},"-D")," and the ",(0,i.kt)("inlineCode",{parentName:"p"},"USE_"),". This differs from the way in which the configurator displays theses options.")),(0,i.kt)("p",null,"These defines that we add, either on the command line or in the custom defines (in expert mode) in the configurator, are called ",(0,i.kt)("inlineCode",{parentName:"p"},"gates"),", and include or exclude whole sections of code."),(0,i.kt)("h3",{id:"custom-defaults---for-developers---debugger-use-only"},"Custom Defaults - for Developers - DEBUGGER USE ONLY"),(0,i.kt)("p",null,'As all targets are now MCU based (and cloud built), this poses a problem for developers in flashing and running a fully baked "hex" using the standard debugger. The board scratch space (located at the /src/main/board directory) allows developers to setup their environment like they were running a fully baked unified target.'),(0,i.kt)("admonition",{type:"warning"},(0,i.kt)("p",{parentName:"admonition"},"These instructions are for flashing with a debugger ONLY. Any hex created this way will not flash using the configurator."),(0,i.kt)("p",{parentName:"admonition"},"This is by design.")),(0,i.kt)("p",null,"Once setup, you can simply execute make with ",(0,i.kt)("inlineCode",{parentName:"p"},"make BOARD=BETAFLIGHTF7")," where BETAFLIGHTF7 is the sub directory name under /src/main/board i.e. /src/main/board/BETAFLIGHTF7."),(0,i.kt)("p",null,"For example if you were developing and you had the BETAFLIGHTF7 target:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Create the directory /src/main/board/BETAFLIGHTF7")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},"Create files, ",(0,i.kt)("inlineCode",{parentName:"p"},"board.c"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"board.h"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"board.mk")," in the directory created (in #1 above).")),(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("p",{parentName:"li"},(0,i.kt)("inlineCode",{parentName:"p"},"board.c")," is where you will insert the custom defaults so they are baked into the board already (and do not need to be loaded separately). This is great for debugging as they will already be present in the flash. So the ",(0,i.kt)("inlineCode",{parentName:"p"},"board.c")," for BETAFLIGHTF7 is:"))),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"board.c")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},'#include "board.h"\n\nconst char __attribute__ ((section(".custom_defaults"), used, aligned(4))) customDefaults[] =\n    "# Betaflight\\n"\n    "board_name BETAFLIGHTF7\\n"\n    "manufacturer_id FPVM\\n"\n    "resource BEEPER 1 D15\\n",\n    "resource MOTOR 1 B00\\n",\n    "resource MOTOR 2 B01\\n",\n    "resource MOTOR 3 E09\\n",\n    "resource MOTOR 4 E11\\n",\n    "resource PPM 1 A03\\n",\n    "resource SONAR_TRIGGER 1 B10\\n",\n    "resource SONAR_ECHO 1 B11\\n",\n    "resource LED_STRIP 1 D12\\n",\n    "resource SERIAL_TX 1 A09\\n",\n    "resource SERIAL_TX 2 A02\\n",\n    "resource SERIAL_TX 3 B10\\n",\n    "resource SERIAL_TX 6 C06\\n",\n    "resource SERIAL_RX 1 A10\\n",\n    "resource SERIAL_RX 2 A03\\n",\n    "resource SERIAL_RX 3 B11\\n",\n    "resource SERIAL_RX 6 C07\\n",\n    "resource LED 1 E00\\n",\n    "resource SPI_SCK 1 A05\\n",\n    "resource SPI_SCK 2 B13\\n",\n    "resource SPI_SCK 3 C10\\n",\n    "resource SPI_SCK 4 E02\\n",\n    "resource SPI_MISO 1 A06\\n",\n    "resource SPI_MISO 2 B14\\n",\n    "resource SPI_MISO 3 C11\\n",\n    "resource SPI_MISO 4 E05\\n",\n    "resource SPI_MOSI 1 A07\\n",\n    "resource SPI_MOSI 2 B15\\n",\n    "resource SPI_MOSI 3 C12\\n",\n    "resource SPI_MOSI 4 E06\\n",\n    "resource CAMERA_CONTROL 1 C08\\n",\n    "resource ADC_BATT 1 C03\\n",\n    "resource ADC_RSSI 1 C05\\n",\n    "resource ADC_CURR 1 C02\\n",\n    "resource BARO_CS 1 A01\\n",\n    "resource FLASH_CS 1 E04\\n",\n    "resource OSD_CS 1 B12\\n",\n    "resource GYRO_EXTI 1 D00\\n",\n    "resource GYRO_EXTI 2 E08\\n",\n    "resource GYRO_CS 1 A04\\n",\n    "resource GYRO_CS 2 A15\\n",\n    "resource USB_DETECT 1 C04\\n",\n    "timer C08 AF3\\n",\n    "timer E13 AF1\\n",\n    "timer B00 AF2\\n",\n    "timer B01 AF2\\n",\n    "timer E09 AF1\\n",\n    "timer E11 AF1\\n",\n    "timer D12 AF2\\n",\n    "timer B10 AF1\\n",\n    "timer B11 AF1\\n",\n    "timer C06 AF3\\n",\n    "timer C07 AF3\\n",\n    "timer A03 AF1\\n",\n    "timer A02 AF3\\n",\n    "dma ADC 1 1\\n",\n    "dma pin C08 1\\n",\n    "dma pin E13 1\\n",\n    "dma pin B00 0\\n",\n    "dma pin B01 0\\n",\n    "dma pin E09 2\\n",\n    "dma pin E11 1\\n",\n    "dma pin D12 0\\n",\n    "dma pin B10 0\\n",\n    "dma pin B11 0\\n",\n    "dma pin C06 0\\n",\n    "dma pin C07 1\\n",\n    "dma pin A03 0\\n",\n    "feature OSD\\n",\n    "set mag_bustype = I2C\\n",\n    "set mag_i2c_device = 2\\n",\n    "set baro_spi_device = 1\\n",\n    "set blackbox_device = SPIFLASH\\n",\n    "set current_meter = ADC\\n",\n    "set battery_meter = ADC\\n",\n    "set beeper_inversion = ON\\n",\n    "set beeper_od = OFF\\n",\n    "set max7456_spi_bus = 2\\n",\n    "set dashboard_i2c_bus = 2\\n",\n    "set flash_spi_bus = 4\\n",\n    "set gyro_1_bustype = SPI\\n",\n    "set gyro_1_spibus = 1\\n",\n    "set gyro_1_sensor_align = CW90\\n",\n    "set gyro_1_align_yaw = 900\\n",\n    "set gyro_2_spibus = 3\\n",\n    "set gyro_2_sensor_align = CW270\\n",\n    "set gyro_2_align_yaw = 2700\\n"\n    "\\0";\n')),(0,i.kt)("p",null,'NOTE: When wanting to do this for other boards, the contents is replaced with everything you need for the custom defaults configuration you want to "bake" into the board when flashed. You can get this from the unified targets repository if needed. DO NOT forget the firstline ',(0,i.kt)("inlineCode",{parentName:"p"},"# Betaflight\\n"),", the ",(0,i.kt)("inlineCode",{parentName:"p"},"\\0")," terminator (one at the very end of the list), and the ",(0,i.kt)("inlineCode",{parentName:"p"},"\\n")," line termination (one at the end of each line) need to be added."),(0,i.kt)("ol",{start:4},(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"board.h")," allows for any defines that you are working on as developers rather than specify via command line in EXTRA_FLAGS (as the cloud build system does). Therefore for ",(0,i.kt)("inlineCode",{parentName:"li"},"board.h")," for the BETAFLIGHTF7 insert the following:")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"board.h")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"#define USE_GYRO_SPI_MPU6000\n#define USE_ACC_SPI_MPU6000\n#define USE_GYRO_SPI_MPU6500\n#define USE_ACC_SPI_MPU6500\n#define USE_MAX7456\n#define USE_DSHOT\n#define USE_SERIALRX\n#define USE_SERIALRX_CRSF\n#define USE_SERIALRX_GHST\n#define USE_SERIALRX_SBUS\n#define USE_TELEMETRY\n#define USE_FLASH\n#define USE_OSD\n#define USE_VTX\n#define USE_TELEMETRY_CRSF\n#define USE_TELEMETRY_GHST\n")),(0,i.kt)("ol",{start:5},(0,i.kt)("li",{parentName:"ol"},(0,i.kt)("inlineCode",{parentName:"li"},"board.mk")," allows for any additional source files, and to specify the target. The minimum requirement is the target (unless you specify this on the command line for make). So the contents of ",(0,i.kt)("inlineCode",{parentName:"li"},"board.mk")," for BETAFLIGHTF7 is as follows:")),(0,i.kt)("p",null,(0,i.kt)("inlineCode",{parentName:"p"},"board.mk")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"TARGET := STM32F7X2\n\n")),(0,i.kt)("ol",{start:6},(0,i.kt)("li",{parentName:"ol"},"You should now be able to successfully make a debuggable version of Betaflight for the BETAFLIGHTF7 board, using the command line: ",(0,i.kt)("inlineCode",{parentName:"li"},"make BOARD=BETAFLIGHTF7"),". Other command line options all remain valid also. e.g. ",(0,i.kt)("inlineCode",{parentName:"li"},'make BOARD=BETAFLIGHTF7 TARGET=STM32F7X2 EXTRA_FLAGS="-DUSE_BATTERY_CONTINUE"'),".")),(0,i.kt)("p",null,"NOTE: The ",(0,i.kt)("strong",{parentName:"p"},"/src/main/board"),' directory is GIT IGNORED. This is because it is a developers scratch space for this very purpose, so code you include will not be picked up for committing. You can create as many board "profiles" as you like in this directory.'))}p.isMDXComponent=!0},35943:(e,t,n)=>{n.d(t,{Z:()=>a});const a=n.p+"assets/images/pull_request_test_targets-87994d86ab0b258cef38e860c76f59d2.png"}}]);