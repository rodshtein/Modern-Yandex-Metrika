var d=Object.defineProperty;var j=Object.getOwnPropertyDescriptor;var v=Object.getOwnPropertyNames;var C=Object.prototype.hasOwnProperty;var P=(n,e)=>{for(var r in e)d(n,r,{get:e[r],enumerable:!0})},E=(n,e,r,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of v(e))!C.call(n,i)&&i!==r&&d(n,i,{get:()=>e[i],enumerable:!(t=j(e,i))||t.enumerable});return n};var G=n=>E(d({},"__esModule",{value:!0}),n);var H={};P(H,{YMGoal:()=>Y,YMHit:()=>b,YMParams:()=>x,initCounters:()=>k,initMetrika:()=>O});module.exports=G(H);function y(n){let e={counters:{}};return n.forEach(r=>{if(typeof r=="number")e.counters[r]={id:r};else if(Array.isArray(r))l(r,e);else if(typeof r=="object")if("id"in r){let{name:t=r.id,...i}=r;t==null?e.err=="empty-id-error":e.counters[t]=i}else({dev:e.dev,src:e.src,delay:e.delay}=r),r.counters&&l(r.counters,e)}),e}function l(n,e){n.forEach(r=>{if(typeof r=="number"&&(e.counters[r]={id:r}),typeof r=="object"){let{name:t=r.id,...i}=r;t==null?e.err=="empty-id-error":e.counters[t]=i}})}function w(){return new Function("try { return this === window } catch(e) { return false }")()}function a(n,e){switch(n){case"empty-id-error":console.error(`Yandex Metrika - Init error 
\u{1F4A2} Can't recognition some ID's! Check options.`);break;case"hit-error":console.error(`Yandex Metrika - Hit error 
\u{1F4A2} Hit Run with some empty parameters: 
from: ${e.from} 
to: ${e.to} `);break;case"hit":console.info(`Yandex Metrika - info 
\u{1F91C} Hit:
from: ${e.from},
to: ${e.to} `);break;case"no-counters-error":console.error(`Yandex Metrika - Init error 
\u{1F4A2} Can't find any Counters!`);break;case"dev-mode":console.info(`Yandex Metrika - Init info 
\u{1F52E} Work in Dev mode without send any data`);break}}var p={yandex:"https://mc.yandex.ru/metrika/tag.js",cdn:"https://cdn.jsdelivr.net/npm/yandex-metrica-watch/tag.js"},I={trackLinks:!0,accurateTrackBounce:!0,clickmap:!1},s,c,u,o,m,h;async function O(...n){if(!(!w()||Object.keys(o).length)){if({dev:s=!1,src:c="yandex",delay:u=!0,counters:o={},err:m=!1}=y(n),s&&a("dev-mode"),m){a(m);return}return $(),k(o),F(),{hint:(e,r)=>b(e,r),goal:(e,r=!1)=>Y(e,r),params:(e,r=!1)=>x(e,r)}}}function $(){!window.ym||(window.ym=function(){(window.ym.a=window.ym.a||[]).push(arguments)},window.ym.l=1*new Date)}function k(){for(let n in o){let{id:e,disable:r,...t}=o[n];r||(h=!0,window.ym(e,"init",Object.assign(I,t)))}}function F(){if(s)return;if(!h){a("no-counters-error");return}let n=document.createElement("script");n.async=!0,n.src=c=="yandex"?p.yandex:c=="cdn"?p.cdn:c,u>1?setTimeout(()=>{document.head.append(n)},u):u?window.onload=document.head.append(n):document.head.append(n)}function M(n,e){if(!s){if(!o.includes(e)){console.error(`[YMetrika][sendParams] The ${e} is not initiated`);return}n.apply(this,arguments)}}function b(n,e,r){if(!n||!e){a("hit-error",{from:n,to:e});return}if(s){a("hit",{from:n,to:e});return}if(r)window.ym(o[r].id,"hit",e,{referer:n});else for(let t in o)window.ym(o[t].id,"hit",e,{referer:n})}function Y(n,e=!1){if(s)return;if(!o.length){console.error("[YMetrika][YMGoal] Metrika is not initiated");return}if(n===null||!n){console.error("[YMetrika][YMGoal] First argument must be an Object or String");return}let r,t,i,f;if(typeof r=="object"?{target:r,params:t,callback:i,ctx:f}=n:r=n,e){M(window.ym(e,"reachGoal",r,t,i,f),e);return}o.forEach(({id:g})=>{window.ym(g,"reachGoal",r,t,i,f)})}function x(n,e=!1){if(s)return;if(typeof n!="object"||n===null||!n){console.error("[YMetrika][YMParams] First argument must be an Object");return}if(!o.length){console.error("[YMetrika][YMParams] Metrika is not initiated");return}let{visitParams:r,goalParams:t}=n;if(r=r||n,e){M(window.ym(e,"params",r,t),e);return}o.forEach(({id:i})=>{window.ym(i,"params",n)})}
//! Made in Misha Rodstein, thanks for using ❤️ 
//! http://github.com/rodshtein/modern-yandex-metrika
