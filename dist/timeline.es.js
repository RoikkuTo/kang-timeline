import { nanoid as c } from "nanoid";
let u = [];
class r {
  static loop(t) {
    for (const s of u)
      s.consume(t);
    r.requestId = requestAnimationFrame(r.loop);
  }
  static start() {
    r.requestId = requestAnimationFrame(r.loop);
  }
  static stop() {
    cancelAnimationFrame(r.requestId);
  }
  static subscribe(t) {
    u.push(t);
  }
  static checkId(t) {
    return u.every((s) => s.id !== t);
  }
  static unsubscribe(t) {
    const s = u.findIndex((i) => i.id === t);
    s !== -1 && u.splice(s, 1);
  }
}
r.start();
class m {
  constructor(t) {
    if (this.frequency = 1, this.task = () => null, this.count = 0, typeof t == "object") {
      const { frequency: s, run: i } = t;
      this.frequency = s || 1, this.task = i;
    } else
      typeof t == "function" && (this.task = t);
  }
  run(t) {
    this.task && t.currentTime % this.frequency > 0 && (this.count++, this.task({ ...t, count: this.count }));
  }
}
class d {
  constructor() {
    this.list = [], this.index = 0;
  }
  add(t) {
    this.list.push({ id: Math.random() + Date.now(), ...t }), this.list.sort((s, i) => s.timestamp < i.timestamp ? -1 : s.timestamp > i.timestamp ? 1 : 0);
  }
  remove(t) {
    const s = this.list.map((i) => i.id).indexOf(t);
    this.list.splice(s, 1), this.index--;
  }
  compare(t) {
    this.list[this.index] && this.list[this.index].timestamp <= t.currentTime && (this.list[this.index].task(t), this.index++);
  }
}
class f {
  constructor(t) {
    this.link = null, this.context = t;
  }
  add(t, s = () => null) {
    const i = this.link;
    return this.link = new Promise(async function(n, h) {
      await i, await new Promise(t).then(() => {
        s(), n(null);
      }).catch(() => {
        console.error("Missing resolve in the request function."), s(), h();
      });
    }), this.context;
  }
}
class y {
  constructor(t) {
    this.temp = null, this.keytime = null, this.timestamp = 0, this.context = t;
  }
  compare(t) {
    this.keytime && (this.temp === null && (this.temp = t.globalTime + this.keytime.delay), this.temp !== null && this.temp <= t.globalTime && (this.keytime.callback(t), this.keytime = null, this.temp = null));
  }
}
class l {
  constructor(t, s) {
    this.currentTime = t, this.globalTime = s;
  }
}
class _ {
  constructor({ id: t, speed: s, task: i, loop: n, range: h } = {}) {
    var o;
    this._id = c(), this._range = null, this._state = "stop", this.taskObj = null, this.bank = null, this.initial = 0, this.current = 0, this._min = 0, this._max = null, this.finishHandlers = [], this.isFinished = !1, this.sync = {
      start: (e) => {
        this._state = "start", e == null || e();
      },
      stop: (e) => {
        this._state = "stop", e == null || e();
      },
      reset: (e) => {
        this._state = "reset", e == null || e();
      }
    }, t && (this.id = t), this.speed = s || 1, i && (this.task = i), h && (this.range = h), this.loop = !!n, this.userKeytimes = new d(), this.chain = new f(this), this.utilKeytimes = new y(this), Array.isArray(this._range) && (this.current = (o = this._range) == null ? void 0 : o[0]), r.subscribe(this);
  }
  get id() {
    return this._id;
  }
  set id(t) {
    r.checkId(t) ? this._id = t : console.error(`ERROR: The "${t}" id has already been defined. (Timeline Library)`);
  }
  get task() {
    return this._task;
  }
  set task(t) {
    this._task = t, this.taskObj = t ? new m(t) : null;
  }
  get range() {
    return this._range;
  }
  set range(t) {
    var s, i;
    this._range = t, this._min = Array.isArray(this._range) ? (s = this._range) == null ? void 0 : s[0] : 0, this._max = Array.isArray(this._range) ? (i = this._range) == null ? void 0 : i[1] : this._range;
  }
  get min() {
    return this._min;
  }
  get max() {
    return this._max;
  }
  get state() {
    return this._state;
  }
  get currentTimestamp() {
    return this.current;
  }
  consume(t) {
    this.controller(t);
    const s = new l(this.current, t);
    this.utilKeytimes.compare(s), this.userKeytimes.compare(s);
  }
  controller(t) {
    var s;
    switch (this.initial || (this.initial = t - (Array.isArray(this._range) ? this._range[0] : 0)), this._state) {
      case "start":
        if (this.bank && (this.initial += this.bank, this.bank = null), this.isFinished && (this.isFinished = !1), this.current = (t - this.initial) * this.speed, this.taskObj && this.taskObj.run(new l(this.current, t)), this._range && (Array.isArray(this._range) && ((s = this._range) == null ? void 0 : s[1]) <= this.current || this._range <= this.current)) {
          const i = () => {
            for (const n of this.finishHandlers)
              n();
          };
          this.loop ? (this.sync.reset(), this.start()) : (this.isFinished = !0, this.sync.stop(i));
        }
        break;
      case "stop":
        this.bank = (t - this.initial - this.current) * this.speed;
        break;
      case "reset":
        this._state = "stop", this.current = Array.isArray(this._range) ? this._range[0] : 0, this.initial = 0, this.bank = null, this.taskObj && (this.taskObj.count = 0);
        break;
      default:
        console.error("Undefined state.");
        break;
    }
  }
  request(t, s = 0, i) {
    const n = (h, o) => {
      this.utilKeytimes.keytime = {
        id: Date.now(),
        delay: s,
        callback: () => {
          this._state = t, h(null);
        }
      };
    };
    return this.chain.add(n.bind(this), i);
  }
  start(t, s) {
    return this.request("start", t, s);
  }
  stop(t, s) {
    return this.request("stop", t, s);
  }
  reset(t, s) {
    return this.request("reset", t, s);
  }
  delete() {
    r.unsubscribe(this._id);
  }
  setTimestamp(t) {
    this.current -= this.current - t;
  }
  addKeytime(t) {
    this.userKeytimes.add(t);
  }
  removeKeytime(t) {
    this.userKeytimes.remove(t);
  }
  listKeytimes() {
    return this.userKeytimes.list;
  }
  onFinish(t) {
    this.finishHandlers.push(t);
  }
  offFinish(t) {
    const s = this.finishHandlers.indexOf(t);
    s !== -1 && this.finishHandlers.splice(s, 1);
  }
}
export {
  _ as default
};
