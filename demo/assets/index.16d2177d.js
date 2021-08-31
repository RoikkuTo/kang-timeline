import{E as e,R as t,a as s}from"./vendor.462e4d9e.js";const i=({opts:s,idx:i})=>{const[n,r]=e.exports.useState(i||0),a=e.exports.useCallback((()=>{Array.isArray(s)?(s[n].callback(),s.length>1&&r((e=>e++))):s.callback()}),[n,s]);return e.exports.useEffect((()=>{void 0!==i&&r(i)}),[i]),t.createElement("div",{className:`button simple ${Array.isArray(s)?s[n].className:s.className}`,onClick:a},t.createElement("img",{src:Array.isArray(s)?s[n].icon:s.icon,alt:""}))},n=({timeline:s})=>{const i=e.exports.useCallback((e=>{s.speed=Number(e.target.value)}),[]);return t.createElement("div",{className:"button speed"},t.createElement("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHnSURBVHgBrVO9TgJBEL49OUAE/yrEYEwoLLAiASQRAiR0BJBCKhpfANHQWJioBSCGhIqfIB0NFmBB6zMY8Q30Gjo0sYG7c0Z3yUIo2WSyuzNz33z3zawgLGERdtA0TYRthV3BFEKIxsUJzWc5GFfxIHIJUiqV8ni93pdyubwDdx318wCrfr//NhAI3MBZz+JTFmAmj8czcLlcmtvtHtTr9T3wSZgItgJmDoVC9xhHSyQSPsr+nwmlr0aj0TOdTicrinLYbDb7jUYDGRnATOFw+Ho0GuUw2WazZbrd7iv9TuDZIP31UqnkA0afWA32906ncxCJRB44BueYR9mRGWEZEFbN5/POXq/3NJlMdkVR/FZV1YJxu91+Af5HOP6AqBNh0aL/jzps1Wq1AGjzxRgkk8k78G9jfP47cREWGlRMgDYW5pRl+aTVam0i+5muLADBGTCCiFfD4TCLDofDUZAkSR6Px05g91ypVKwC1/4ZEBSKAky7AACXIGzlFBbrWrvd7sMc/QEJC/QwBIPBAtMgHo9nwbcBZpzvGmj1lsvlrPPDRniQWCyWgbuFtp2w9heLxSMA+AC2JRxONmw8EHbFnE6nj2Ff47vAAZmr1eo+nRM9i/MPkH9cGsyBMleEUA3RVJqjCstavzwRO/5lMCdRAAAAAElFTkSuQmCC",alt:""}),t.createElement("input",{type:"number",className:"valSpeed",step:"0.1",min:"0",defaultValue:"1.0",onChange:i,onBlur:e=>console.log(e.target.value)}))},r=({timestamp:s})=>{const i=e.exports.useRef(!1),n=e.exports.useRef(0),r=e.exports.useCallback((e=>{const t=new Date(e).toJSON(),s=/.*T(.*)Z/.exec(t);return(null==s?void 0:s[1].split(":"))||["--","--","--"]}),[]),a=e.exports.useCallback((()=>{i.current=!i.current,n.current=s}),[s]),l=r(i.current?n.current:s);return t.createElement("div",{className:"timestamp",onClick:a},t.createElement("div",null,t.createElement("span",null,l[0]),t.createElement("span",{className:"column"},":"),t.createElement("span",null,l[1]),t.createElement("span",{className:"column"},":"),t.createElement("span",null,l[2])))},a=({state:s,timeline:a,deleteTl:l})=>{const[c,o]=e.exports.useState(0);return e.exports.useEffect((()=>{const e=()=>{console.log("oui"),o(1)};return a.onFinish(e),()=>{a.offFinish(e)}}),[]),t.createElement("div",{className:"buttons"},t.createElement("div",{className:"left-btns"},t.createElement(i,{opts:[{className:"stop",icon:"./assets/stop.515d3f71.svg",callback:()=>a.stop()},{className:"start",icon:"./assets/start.70e39199.svg",callback:()=>a.start()}],idx:c}),t.createElement(i,{opts:{className:"restart",icon:"./assets/restart_png_2.4fe47cb0.png",callback:()=>a.reset()[a.state](0,(()=>s[1](0)))}}),t.createElement(n,{timeline:a})),t.createElement(r,{timestamp:s[0]}),t.createElement(i,{opts:{className:"delete",icon:"./assets/delete_cross.c9c00841.svg",callback:l}}))};const l=({ratio:e})=>t.createElement("div",{className:"track"},t.createElement("div",{className:"runnable",style:{width:100*e+"%"}})),c=({state:s,timeline:i})=>{const[n]=s,r=e.exports.useRef(null),a=e.exports.useRef(!1),c=e.exports.useRef("stop"),[o,u]=e.exports.useState(0),h=e.exports.useCallback((e=>{if(r.current){const t=r.current.getBoundingClientRect(),s=e.clientX,i=Number((s-t.x)/t.width);i>=0&&i<=1&&u(i)}}),[]),m=e.exports.useCallback((e=>{i.stop(),c.current=i.state,a.current=!0,h(e)}),[]);return e.exports.useEffect((()=>(window.onmousemove=e=>{a.current&&h(e)},()=>{window.onmousemove=null})),[]),e.exports.useEffect((()=>(window.onmouseup=()=>{a.current&&(a.current=!1,i[c.current](),i.setTimestamp(Math.round(o*i.max)))},()=>{window.onmouseup=null})),[o]),t.createElement("div",{ref:r,className:"range",onMouseDown:m},t.createElement(l,{ratio:a.current?o:n/i.max}))};let o=[];class u{static loop(e){for(const t of o)t.consume(e);u.requestId=requestAnimationFrame(u.loop)}static start(){u.requestId=requestAnimationFrame(u.loop)}static stop(){cancelAnimationFrame(u.requestId)}static subscribe(e){o.push(e)}static checkId(e){return o.every((t=>t.id!==e))}static unsubscribe(e){const t=o.findIndex((t=>t.id===e));-1!==t&&o.splice(t,1)}}u.start();class h{constructor(e){if(this.frequency=1,this.task=()=>null,this.count=0,"object"==typeof e){const{frequency:t,run:s}=e;this.frequency=t||1,this.task=s}else"function"==typeof e&&(this.task=e)}run(e){this.task&&e.currentTime%this.frequency>0&&(this.count++,this.task(Object.assign(Object.assign({},e),{count:this.count})))}}class m{constructor(){this.list=[],this.index=0}add(e){this.list.push(Object.assign({id:Math.random()+Date.now()},e)),this.list.sort(((e,t)=>e.timestamp<t.timestamp?-1:e.timestamp>t.timestamp?1:0))}remove(e){const t=this.list.map((e=>e.id)).indexOf(e);this.list.splice(t,0),this.index--}compare(e){this.list[this.index]&&this.list[this.index].timestamp<=e.currentTime&&(this.list[this.index].task(e),this.index++)}}var d=function(e,t,s,i){return new(s||(s=Promise))((function(n,r){function a(e){try{c(i.next(e))}catch(t){r(t)}}function l(e){try{c(i.throw(e))}catch(t){r(t)}}function c(e){var t;e.done?n(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,l)}c((i=i.apply(e,t||[])).next())}))};class p{constructor(e){this.link=null,this.context=e}add(e,t=(()=>null)){const s=this.link;return this.link=new Promise((function(i,n){return d(this,void 0,void 0,(function*(){yield s,yield new Promise(e).then((()=>{t(),i(null)})).catch((()=>{console.error("Missing resolve in the request function."),t(),n()}))}))})),this.context}}class A{constructor(e){this.temp=null,this.keytime=null,this.timestamp=0,this.context=e}compare(e){this.keytime&&(null===this.temp&&(this.temp=e.globalTime+this.keytime.delay),null!==this.temp&&this.temp<=e.globalTime&&(this.keytime.callback(e),this.keytime=null,this.temp=null))}}class f{constructor(e,t){this.currentTime=e,this.globalTime=t}}class g{constructor({id:e,speed:t,task:s,loop:i,range:n}={}){var r;this._id=Date.now(),this._range=null,this._state="stop",this.taskObj=null,this.bank=null,this.initial=0,this.current=0,this._min=0,this._max=null,this.finishHandlers=[],e&&(this.id=e),this.speed=t||1,s&&(this.task=s),n&&(this.range=n),this.loop=!!i,this.userKeytimes=new m,this.chain=new p(this),this.utilKeytimes=new A(this),Array.isArray(this._range)&&(this.current=null===(r=this._range)||void 0===r?void 0:r[0]),u.subscribe(this)}get id(){return this._id}set id(e){u.checkId(e)?this._id=e:console.error(`ERROR: The "${e}" id has already been defined. (Timeline Library)`)}get task(){return this._task}set task(e){this._task=e,this.taskObj=e?new h(e):null}get range(){return this._range}set range(e){var t,s;this._range=e,this._min=Array.isArray(this._range)?null===(t=this._range)||void 0===t?void 0:t[0]:0,this._max=Array.isArray(this._range)?null===(s=this._range)||void 0===s?void 0:s[1]:this._range}get min(){return this._min}get max(){return this._max}get state(){return this._state}get currentTimestamp(){return this.current}consume(e){this.controller(e);const t=new f(this.current,e);this.utilKeytimes.compare(t),this.userKeytimes.compare(t)}controller(e){var t;switch(this.initial||(this.initial=e),this._state){case"start":if(this.bank&&(this.initial+=this.bank,this.bank=null),this.current=(e-this.initial)*this.speed,this.taskObj&&this.taskObj.run(new f(this.current,e)),this._range&&(Array.isArray(this._range)&&(null===(t=this._range)||void 0===t?void 0:t[1])<=this.current||this._range<=this.current)){const e=()=>{console.log(this.finishHandlers,this.current);for(const e of this.finishHandlers)e()};this.loop?this.reset(0,e).start():this.stop(0,e)}break;case"stop":this.bank=(e-this.initial-this.current)*this.speed;break;case"reset":this._state="stop",this.current=0,this.initial=0,this.bank=null,this.taskObj&&(this.taskObj.count=0);break;default:console.error("Undefined state.")}}request(e,t=0,s){return this.chain.add(((s,i)=>{this.utilKeytimes.keytime={id:Date.now(),delay:t,callback:t=>{this._state=e,s(null)}}}).bind(this),s)}start(e,t){return this.request("start",e,t)}stop(e,t){return this.request("stop",e,t)}reset(e,t){return this.request("reset",e,t)}delete(){u.unsubscribe(this._id)}setTimestamp(e){this.current-=this.current-e}addKeytime(e){this.userKeytimes.add(e)}removeKeytime(e){this.userKeytimes.remove(e)}listKeytimes(){return this.userKeytimes.list}onFinish(e){this.finishHandlers.push(e)}offFinish(e){const t=this.finishHandlers.indexOf(e);-1!==t&&this.finishHandlers.splice(t,1)}}var b="_container_ko013_1",k={};function E({visible:s,children:i}){const[n,r]=e.exports.useState({}),a=e.exports.useRef(null);return e.exports.useEffect((()=>{r({height:a.current.clientHeight+"px"})}),[]),e.exports.useEffect((()=>{s||r({height:0,opacity:0})}),[s]),t.createElement("div",{ref:a,className:k.div,style:n},i)}const x=({opts:s})=>{const[i,n]=e.exports.useState(0),[r,l]=e.exports.useState(!0),o=e.exports.useRef(new g(s||{range:6e4,loop:!0})),u=e.exports.useCallback((()=>{o.current.delete(),l(!1)}),[]);return e.exports.useEffect((()=>(o.current.task={frequency:100,run:({currentTime:e})=>n(e)},o.current.start(),()=>{o.current.delete()})),[]),t.createElement(E,{visible:r},t.createElement("div",{className:b},t.createElement(a,{state:[i,n],timeline:o.current,deleteTl:u}),t.createElement(c,{state:[i,n],timeline:o.current})))};function y(){return t.createElement("div",{style:{display:"grid",gap:"10px"}},t.createElement(x,null),t.createElement(x,{opts:{range:6e5,loop:!0}}),t.createElement(x,{opts:{range:18e4,loop:!0}}),t.createElement(x,{opts:{range:1e3}}))}function v(){return t.createElement("div",{className:"App"},t.createElement(y,null))}s.render(t.createElement(v,null),document.getElementById("root"));
