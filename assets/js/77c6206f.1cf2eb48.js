"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8748],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(67294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(r),f=o,m=u["".concat(s,".").concat(f)]||u[f]||d[f]||i;return r?n.createElement(m,a(a({ref:t},p),{},{components:r})):n.createElement(m,a({ref:t},p))}));function m(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=r.length,a=new Array(i);a[0]=f;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:o,a[1]=l;for(var c=2;c<i;c++)a[c]=r[c];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},93905:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>s,contentTitle:()=>a,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var n=r(87462),o=(r(67294),r(3905));const i={},a=void 0,l={unversionedId:"documentation/development/Travis",id:"documentation/development/Travis",title:"Travis",description:"Cleanflight provides Travis build and config files in the repository root.",source:"@site/docs/documentation/development/Travis.md",sourceDirName:"documentation/development",slug:"/documentation/development/Travis",permalink:"/docs/documentation/development/Travis",draft:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Test coverage analysis",permalink:"/docs/documentation/development/TestCoverage"},next:{title:"OSD Glyphs",permalink:"/docs/documentation/osd"}},s={},c=[{value:"Pushing builds to a remote server",id:"pushing-builds-to-a-remote-server",level:2}],p={toc:c};function u(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"#Travis"),(0,o.kt)("p",null,"Cleanflight provides Travis build and config files in the repository root."),(0,o.kt)("h2",{id:"pushing-builds-to-a-remote-server"},"Pushing builds to a remote server"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},".travis.sh")," script can upload build artifacts to a remote server. This feature is controlled by the\n",(0,o.kt)("inlineCode",{parentName:"p"},"PUBLISH_URL")," environment variable. If set, the build script will use the cURL binary and simulate\na file upload post to the configured server."),(0,o.kt)("p",null,"Pleas check the ",(0,o.kt)("inlineCode",{parentName:"p"},"notifications")," section in the ",(0,o.kt)("inlineCode",{parentName:"p"},".travis.yml")," file and adjust the irc notifications if you plan on using Travis on your Cleanflight fork"))}u.isMDXComponent=!0}}]);