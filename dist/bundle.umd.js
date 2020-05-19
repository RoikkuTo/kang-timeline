(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.UMDBundle = factory());
}(this, (function () { 'use strict';

    var timeSubscribers = [];
    class Time {
      static loop(timestamp) {
        timeSubscribers.forEach(consumer => consumer(timestamp));
        Time.requestId = requestAnimationFrame(Time.loop);
      }

      static start() {
        Time.requestId = requestAnimationFrame(Time.loop);
      }

      static subscribe(subscriber) {
        timeSubscribers.push(subscriber);
      }

    }
    Time.start();

    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }

      if (info.done) {
        resolve(value);
      } else {
        Promise.resolve(value).then(_next, _throw);
      }
    }

    function _asyncToGenerator(fn) {
      return function () {
        var self = this,
            args = arguments;
        return new Promise(function (resolve, reject) {
          var gen = fn.apply(self, args);

          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }

          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }

          _next(undefined);
        });
      };
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }

      return keys;
    }

    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};

        if (i % 2) {
          ownKeys(Object(source), true).forEach(function (key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }

      return target;
    }

    class Task {
      constructor(task) {
        if (typeof task === 'object') {
          var {
            frequency,
            run
          } = task;
          this.frequency = frequency || 0;
          this.task = run;
        } else if (typeof task === 'function') {
          this.frequency = 0;
          this.task = task;
        }

        this.count = 0;
      }

      run(timestamp) {
        if (timestamp.currentTime >= this.frequency * this.count) {
          this.count++;
          this.task(_objectSpread2(_objectSpread2({}, timestamp), {}, {
            count: this.count
          }));
        }
      }

    }

    class Keytime {
      constructor() {
        this.list = [];
        this.index = 0;
      }

      add(key) {
        this.list.push(key);
        this.list.sort((a, b) => {
          if (a.timestamp < b.timestamp) return -1;
          if (a.timestamp > b.timestamp) return 1;
          return 0;
        });
      }

      compare(timestamp) {
        if (this.list[this.index] && this.list[this.index].timestamp <= timestamp) {
          this.list[this.index].callback(timestamp);
          this.index++;
        }
      }

    }

    class Chain {
      constructor(context) {
        this.context = context;
        this.link = null;
      }

      add(request) {
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : () => null;
        var priv = this.link;
        this.link = new Promise( /*#__PURE__*/function () {
          var _ref = _asyncToGenerator(function* (resolve, reject) {
            yield priv;
            yield new Promise((resolve, reject) => request(resolve, reject)).then(res => {
              callback(res);
              resolve();
            }).catch(err => {
              console.error('Missing resolve in the request function.');
              callback(err);
              reject();
            });
          });

          return function (_x, _x2) {
            return _ref.apply(this, arguments);
          };
        }());
        return this.context;
      }

    }

    class Util {
      constructor(context) {
        this.context = context;
        this.temp = null;
        this.key = null;
        this.initial = 0;
        this.timestamp = 0;
      }

      compare(timestamp) {
        if (this.key) {
          if (this.temp === null) this.temp = timestamp + this.key.delay;

          if (this.temp !== null && this.temp <= timestamp) {
            this.key.callback(timestamp);
            this.key = null;
            this.temp = null;
          }
        }
      }

    }

    class Timestamp {
      constructor(_ref) {
        var {
          currentTime,
          globalTime
        } = _ref;
        this.currentTime = currentTime;
        this.globalTime = globalTime;
      }

    }

    class Timeline {
      constructor(_ref) {
        var {
          id,
          ratio,
          task
          /* , range */

        } = _ref;
        this.id = id || Date.now();
        this.ratio = ratio || 1;
        this.task = task ? new Task(task) : null;
        this.keytime = new Keytime(); // this.range = range || [0, null, false]

        this.chain = new Chain(this);
        this.util = new Util(this);
        this.bank = 0;
        this.initial = 0;
        this.current = 0;
        this.state = 'stop';
        Time.subscribe(this.consume.bind(this));
      }

      consume(timestamp) {
        this.controller(timestamp);
        this.util.compare(timestamp);
        this.keytime.compare(timestamp);
      }

      controller(timestamp) {
        if (!this.initial) this.initial = timestamp;

        switch (this.state) {
          case 'start':
            if (this.bank) {
              this.initial += this.bank;
              this.bank = null;
            }

            this.current = (timestamp - this.initial) * this.ratio;
            this.task && this.task.run(new Timestamp({
              currentTime: this.current,
              globalTime: timestamp
            }));
            break;

          case 'stop':
            this.bank = (timestamp - this.initial - this.current) * this.ratio;
            break;

          case 'reset':
            this.state = 'stop';
            this.initial = 0;
            this.current = 0;
            break;

          default:
            console.error('Undefined state.');
            break;
        }
      }

      request(name) {
        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

        var req = (resolve, reject) => {
          this.util.key = {
            delay,
            callback: timestamp => {
              this.state = name;
              resolve();
            }
          };
        };

        return this.chain.add(req.bind(this));
      }

      start(delay) {
        return this.request('start', delay);
      }

      stop(delay) {
        return this.request('stop', delay);
      }

      reset(delay) {
        return this.request('reset', delay);
      }

      addKeytime(key) {
        this.keytime.add(key);
      }

    }

    return Timeline;

})));
