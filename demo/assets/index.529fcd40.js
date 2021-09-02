import{E as e,R as t,a as s}from"./vendor.462e4d9e.js";var n={chrono:"_chrono_1fk8h_1","chrono-template":"_chrono-template_1fk8h_8",column:"_column_1fk8h_8",container:"_container_1fk8h_13",provider:"_provider_1fk8h_21",main:"_main_1fk8h_25",controls:"_controls_1fk8h_32",btn:"_btn_1fk8h_39",simple:"_simple_1fk8h_50"};function r({timestamp:s}){const r=e.exports.useCallback((e=>{const t=new Date(e).toJSON(),s=/.*T(.*)Z/.exec(t);return(null==s?void 0:s[1].split(":"))||["--","--","--"]}),[])(s);return t.createElement("div",{className:n["chrono-template"]},t.createElement("span",null,r[0]),t.createElement("span",{className:n.column},":"),t.createElement("span",null,r[1]),t.createElement("span",{className:n.column},":"),t.createElement("span",null,r[2]))}function i({opts:s,idx:n,style:r}){const[i,a]=e.exports.useState(0),l=e.exports.useCallback((()=>{Array.isArray(s)?(s[i].callback(),s.length>1&&a((e=>e===s.length-1?0:e+1))):s.callback()}),[i,s]);return e.exports.useEffect((()=>{n&&(n.current=a)}),[]),t.createElement("div",{className:`${r.btn} ${r.simple} ${Array.isArray(s)?r[s[i].className]:r[s.className]}`,onClick:l},t.createElement("img",{src:Array.isArray(s)?s[i].icon:s.icon,alt:""}))}var a="./assets/start.70e39199.svg",l="./assets/stop.515d3f71.svg",c="./assets/restart_png_2.4fe47cb0.png",o="./assets/record.af0253a6.svg";function u({state:s,timeline:r}){const[,u]=e.exports.useContext(D),m=e.exports.useRef(0);return t.createElement("div",{className:n.controls}," ",t.createElement(i,{style:n,opts:[{className:"start",icon:a,callback:()=>{r.isFinished&&r.max&&r.currentTimestamp>=r.max?r.reset().start():r.start()}},{className:"stop",icon:l,callback:()=>r.stop()}]}),t.createElement(i,{style:n,opts:{className:"restart",icon:c,callback:()=>{r.reset()[r.state](0,(()=>s[1](0)))}}}),t.createElement(i,{style:n,opts:[{className:"record",icon:o,callback:()=>m.current=s[0]},{className:"record",icon:o,callback:()=>u(m.current,s[0])}]}))}let m=[];class h{static loop(e){for(const t of m)t.consume(e);h.requestId=requestAnimationFrame(h.loop)}static start(){h.requestId=requestAnimationFrame(h.loop)}static stop(){cancelAnimationFrame(h.requestId)}static subscribe(e){m.push(e)}static checkId(e){return m.every((t=>t.id!==e))}static unsubscribe(e){const t=m.findIndex((t=>t.id===e));-1!==t&&m.splice(t,1)}}h.start();class p{constructor(e){if(this.frequency=1,this.task=()=>null,this.count=0,"object"==typeof e){const{frequency:t,run:s}=e;this.frequency=t||1,this.task=s}else"function"==typeof e&&(this.task=e)}run(e){this.task&&e.currentTime%this.frequency>0&&(this.count++,this.task(Object.assign(Object.assign({},e),{count:this.count})))}}class d{constructor(){this.list=[],this.index=0}add(e){this.list.push(Object.assign({id:Math.random()+Date.now()},e)),this.list.sort(((e,t)=>e.timestamp<t.timestamp?-1:e.timestamp>t.timestamp?1:0))}remove(e){const t=this.list.map((e=>e.id)).indexOf(e);this.list.splice(t,0),this.index--}compare(e){this.list[this.index]&&this.list[this.index].timestamp<=e.currentTime&&(this.list[this.index].task(e),this.index++)}}var f=function(e,t,s,n){return new(s||(s=Promise))((function(r,i){function a(e){try{c(n.next(e))}catch(t){i(t)}}function l(e){try{c(n.throw(e))}catch(t){i(t)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,l)}c((n=n.apply(e,t||[])).next())}))};class _{constructor(e){this.link=null,this.context=e}add(e,t=(()=>null)){const s=this.link;return this.link=new Promise((function(n,r){return f(this,void 0,void 0,(function*(){yield s,yield new Promise(e).then((()=>{t(),n(null)})).catch((()=>{console.error("Missing resolve in the request function."),t(),r()}))}))})),this.context}}class A{constructor(e){this.temp=null,this.keytime=null,this.timestamp=0,this.context=e}compare(e){this.keytime&&(null===this.temp&&(this.temp=e.globalTime+this.keytime.delay),null!==this.temp&&this.temp<=e.globalTime&&(this.keytime.callback(e),this.keytime=null,this.temp=null))}}class k{constructor(e,t){this.currentTime=e,this.globalTime=t}}class E{constructor({id:e,speed:t,task:s,loop:n,range:r}={}){var i;this._id=Date.now(),this._range=null,this._state="stop",this.taskObj=null,this.bank=null,this.initial=0,this.current=0,this._min=0,this._max=null,this.finishHandlers=[],this.isFinished=!1,this.sync={start:e=>{this._state="start",null==e||e()},stop:e=>{this._state="stop",null==e||e()},reset:e=>{this._state="reset",null==e||e()}},e&&(this.id=e),this.speed=t||1,s&&(this.task=s),r&&(this.range=r),this.loop=!!n,this.userKeytimes=new d,this.chain=new _(this),this.utilKeytimes=new A(this),Array.isArray(this._range)&&(this.current=null===(i=this._range)||void 0===i?void 0:i[0]),h.subscribe(this)}get id(){return this._id}set id(e){h.checkId(e)?this._id=e:console.error(`ERROR: The "${e}" id has already been defined. (Timeline Library)`)}get task(){return this._task}set task(e){this._task=e,this.taskObj=e?new p(e):null}get range(){return this._range}set range(e){var t,s;this._range=e,this._min=Array.isArray(this._range)?null===(t=this._range)||void 0===t?void 0:t[0]:0,this._max=Array.isArray(this._range)?null===(s=this._range)||void 0===s?void 0:s[1]:this._range}get min(){return this._min}get max(){return this._max}get state(){return this._state}get currentTimestamp(){return this.current}consume(e){this.controller(e);const t=new k(this.current,e);this.utilKeytimes.compare(t),this.userKeytimes.compare(t)}controller(e){var t;switch(this.initial||(this.initial=e-(Array.isArray(this._range)?this._range[0]:0)),this._state){case"start":if(this.bank&&(this.initial+=this.bank,this.bank=null),this.isFinished&&(this.isFinished=!1),this.current=(e-this.initial)*this.speed,this.taskObj&&this.taskObj.run(new k(this.current,e)),this._range&&(Array.isArray(this._range)&&(null===(t=this._range)||void 0===t?void 0:t[1])<=this.current||this._range<=this.current)){const e=()=>{for(const e of this.finishHandlers)e()};this.loop?(this.sync.reset(),this.start()):(this.isFinished=!0,this.sync.stop(e))}break;case"stop":this.bank=(e-this.initial-this.current)*this.speed;break;case"reset":this._state="stop",this.current=Array.isArray(this._range)?this._range[0]:0,this.initial=0,this.bank=null,this.taskObj&&(this.taskObj.count=0);break;default:console.error("Undefined state.")}}request(e,t=0,s){return this.chain.add(((s,n)=>{this.utilKeytimes.keytime={id:Date.now(),delay:t,callback:t=>{this._state=e,s(null)}}}).bind(this),s)}start(e,t){return this.request("start",e,t)}stop(e,t){return this.request("stop",e,t)}reset(e,t){return this.request("reset",e,t)}delete(){h.unsubscribe(this._id)}setTimestamp(e){this.current-=this.current-e}addKeytime(e){this.userKeytimes.add(e)}removeKeytime(e){this.userKeytimes.remove(e)}listKeytimes(){return this.userKeytimes.list}onFinish(e){this.finishHandlers.push(e)}offFinish(e){const t=this.finishHandlers.indexOf(e);-1!==t&&this.finishHandlers.splice(t,1)}}function x(){const[[s,i],a]=e.exports.useState([0,0]),l=e.exports.useRef(new E),c=e.exports.useRef(new E),o=e.exports.useCallback((e=>{a((t=>[s,e]))}),[]);return e.exports.useEffect((()=>(l.current.task={frequency:100,run:({globalTime:e})=>a((t=>[e,t[1]]))},c.current.task={frequency:100,run:({currentTime:e})=>a((t=>[t[0],e]))},l.current.start(),()=>{l.current.delete(),c.current.delete()})),[]),t.createElement("div",{className:n.chrono},t.createElement("div",{className:n.container},t.createElement("div",{className:n.provider},t.createElement(r,{timestamp:s})),t.createElement("div",{className:n.main},t.createElement(r,{timestamp:i})),t.createElement(u,{state:[i,o],timeline:c.current})))}var b={btn:"_btn_zq2j4_1",simple:"_simple_zq2j4_9",restart:"_restart_zq2j4_25",speed:"_speed_zq2j4_28",valSpeed:"_valSpeed_zq2j4_36",delete:"_delete_zq2j4_50"};const y=({timeline:s})=>{const n=e.exports.useCallback((e=>{s.speed=Number(e.target.value)}),[]);return t.createElement("div",{className:`${b.btn} ${b.speed}`},t.createElement("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHnSURBVHgBrVO9TgJBEL49OUAE/yrEYEwoLLAiASQRAiR0BJBCKhpfANHQWJioBSCGhIqfIB0NFmBB6zMY8Q30Gjo0sYG7c0Z3yUIo2WSyuzNz33z3zawgLGERdtA0TYRthV3BFEKIxsUJzWc5GFfxIHIJUiqV8ni93pdyubwDdx318wCrfr//NhAI3MBZz+JTFmAmj8czcLlcmtvtHtTr9T3wSZgItgJmDoVC9xhHSyQSPsr+nwmlr0aj0TOdTicrinLYbDb7jUYDGRnATOFw+Ho0GuUw2WazZbrd7iv9TuDZIP31UqnkA0afWA32906ncxCJRB44BueYR9mRGWEZEFbN5/POXq/3NJlMdkVR/FZV1YJxu91+Af5HOP6AqBNh0aL/jzps1Wq1AGjzxRgkk8k78G9jfP47cREWGlRMgDYW5pRl+aTVam0i+5muLADBGTCCiFfD4TCLDofDUZAkSR6Px05g91ypVKwC1/4ZEBSKAky7AACXIGzlFBbrWrvd7sMc/QEJC/QwBIPBAtMgHo9nwbcBZpzvGmj1lsvlrPPDRniQWCyWgbuFtp2w9heLxSMA+AC2JRxONmw8EHbFnE6nj2Ff47vAAZmr1eo+nRM9i/MPkH9cGsyBMleEUA3RVJqjCstavzwRO/5lMCdRAAAAAElFTkSuQmCC",alt:""}),t.createElement("input",{type:"number",className:`${b.valSpeed}`,step:"0.1",min:"0",defaultValue:"1.0",onChange:n,onBlur:e=>console.log(e.target.value)}))},v=({timestamp:s})=>{const n=e.exports.useRef(!1),i=e.exports.useRef(0);return t.createElement("div",{className:"timestamp",onClick:()=>{n.current=!n.current,i.current=s}},t.createElement(r,{timestamp:n.current?i.current:s}))},g=({state:s,timeline:n,deleteTl:r})=>{const o=e.exports.useRef((()=>{}));return e.exports.useEffect((()=>{const e=()=>o.current(1);return n.onFinish(e),()=>{n.offFinish(e)}}),[]),t.createElement("div",{className:"buttons"},t.createElement("div",{className:"left-btns"},t.createElement(i,{style:b,opts:[{className:"stop",icon:l,callback:()=>n.stop()},{className:"start",icon:a,callback:()=>{n.isFinished&&n.max&&n.currentTimestamp>=n.max?n.reset().start():n.start()}}],idx:o}),t.createElement(i,{style:b,opts:{className:"restart",icon:c,callback:()=>n.reset()[n.state](0,(()=>s[1](n.min)))}}),t.createElement(y,{timeline:n})),t.createElement(v,{timestamp:s[0]}),t.createElement(i,{style:b,opts:{className:"delete",icon:"./assets/delete_cross.c9c00841.svg",callback:r}}))};const w=({ratio:e})=>t.createElement("div",{className:"track"},t.createElement("div",{className:"runnable",style:{width:100*e+"%"}})),N=({state:s,timeline:n})=>{const[r]=s,i=e.exports.useRef(null),a=e.exports.useRef(!1),l=e.exports.useRef("stop"),[c,o]=e.exports.useState(0),u=e.exports.useCallback((e=>{if(i.current){const t=i.current.getBoundingClientRect(),s=e.clientX,n=Number((s-t.x)/t.width);n>=0&&n<=1&&o(n)}}),[]),m=e.exports.useCallback((e=>{n.stop(),l.current=n.state,a.current=!0,u(e)}),[]);return e.exports.useEffect((()=>(window.onmousemove=e=>{a.current&&u(e)},()=>{window.onmousemove=null})),[]),e.exports.useEffect((()=>(window.onmouseup=()=>{a.current&&(a.current=!1,n[l.current](),n.setTimestamp(Math.round(c*(n.max-n.min))))},()=>{window.onmouseup=null})),[c]),t.createElement("div",{ref:i,className:"range",onMouseDown:m},t.createElement(w,{ratio:a.current?c:(r-n.min)/(n.max-n.min)}))};var R="_container_ko013_1";var C="_popanim_pff7t_1";function T({visible:s,children:n}){const[r,i]=e.exports.useState({}),a=e.exports.useRef(null);return e.exports.useEffect((()=>{i({height:a.current.clientHeight+"px"})}),[]),e.exports.useEffect((()=>{s||i({height:0,opacity:0})}),[s]),t.createElement("div",{ref:a,className:C,style:r},n)}const q=({idx:s,opts:n})=>{const[,,r]=e.exports.useContext(D),[i,a]=e.exports.useState(0),[l,c]=e.exports.useState(!0),o=e.exports.useRef(new E(n||{range:6e4,loop:!0})),u=e.exports.useCallback((()=>{o.current.delete(),c(!1),setTimeout((()=>r(s)),250)}),[s]);return e.exports.useEffect((()=>(o.current.task={frequency:100,run:({currentTime:e})=>a(e)},o.current.start(),()=>{o.current.delete()})),[]),t.createElement(T,{visible:l},t.createElement("div",{className:R},t.createElement(g,{state:[i,a],timeline:o.current,deleteTl:u}),t.createElement(N,{state:[i,a],timeline:o.current})))};var j="_home_1526h_1",B="_desc_1526h_7",F="_text_1526h_14",S="_cards_1526h_18";const O=()=>t.createElement("div",{className:F},t.createElement("h1",null,"Timeline"),t.createElement("p",null,"A JS Library which will allow you to manipulate the ",t.createElement("span",{className:"code link"},"window.requestAnimationFrame")," API")),I=()=>{const[s]=e.exports.useContext(D);return t.createElement("div",{className:S},s.map(((e,s)=>t.createElement(q,{key:e.toString(),idx:s,opts:{range:e,loop:!0}}))))};function z(){return t.createElement("div",{className:B},t.createElement(O,null),t.createElement(I,null))}const D=t.createContext([[],()=>null,()=>null]);function H(){const[s,n]=e.exports.useState([]),r=e.exports.useCallback(((e,t)=>{n((s=>[...s,[e,t]]))}),[]),i=e.exports.useCallback((e=>{n((t=>[...t.splice(e,0)]))}),[]);return t.createElement(D.Provider,{value:[s,r,i]},t.createElement("div",{className:j},t.createElement(x,null),t.createElement(z,null)))}function M(){return t.createElement("div",{className:"App"},t.createElement(H,null))}s.render(t.createElement(M,null),document.getElementById("root"));
