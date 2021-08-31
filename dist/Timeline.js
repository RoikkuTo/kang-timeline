import TimeProvider from './TimeProvider';
import Task from './Task';
import UserKeytimes from './UserKeytime';
import Chain from './Chain';
import UtilKeytimes from './UtilKeytimes';
import Timestamp from './Timestamp';
export default class Timeline {
    constructor({ id, speed, task, loop, range } = {}) {
        var _a;
        this._id = Date.now();
        this._range = null;
        this._state = 'stop';
        this.taskObj = null;
        this.bank = null;
        this.initial = 0;
        this.current = 0;
        this._min = 0;
        this._max = null;
        this.finishHandlers = [];
        /**
         * Synchronous control methods
         *
         * Faster and much MUCH more precise controls but less options.
         */
        this.sync = {
            start: callback => {
                this._state = 'start';
                callback === null || callback === void 0 ? void 0 : callback();
            },
            stop: callback => {
                this._state = 'stop';
                callback === null || callback === void 0 ? void 0 : callback();
            },
            reset: callback => {
                this._state = 'reset';
                callback === null || callback === void 0 ? void 0 : callback();
            }
        };
        if (id)
            this.id = id;
        this.speed = speed || 1;
        if (task)
            this.task = task;
        if (range)
            this.range = range;
        this.loop = !!loop;
        this.userKeytimes = new UserKeytimes();
        this.chain = new Chain(this);
        this.utilKeytimes = new UtilKeytimes(this);
        if (Array.isArray(this._range))
            this.current = (_a = this._range) === null || _a === void 0 ? void 0 : _a[0];
        TimeProvider.subscribe(this);
    }
    /**
     * The *id* of the timeline
     *
     * All Timelines have a unique _id_ which is basically a simple `Date.now()` in milliseconds but you can specify a one.
     */
    get id() {
        return this._id;
    }
    set id(id) {
        // if (id) {
        if (TimeProvider.checkId(id))
            this._id = id;
        else
            console.error(`ERROR: The "${id}" id has already been defined. (Timeline Library)`);
        // } else console.error('ERROR: Please specify an id. (Timeline Library)')
    }
    /**
     * The task to be executed by the timeline
     *
     * Task is executed at each loop iterration.
     * It can be a simple function or an object with a function to execute at a given frequency.
     */
    get task() {
        return this._task;
    }
    set task(task) {
        this._task = task;
        this.taskObj = task ? new Task(task) : null;
    }
    /**
     * The range for the timeline
     *
     * A range between which the timeline will be effective, with the first index being the _minimum_ and the second being the _maximum_.
     * If set as a number, the range become `[0, number]` with 0 as minimum.
     */
    get range() {
        return this._range;
    }
    set range(range) {
        var _a, _b;
        this._range = range;
        this._min = Array.isArray(this._range) ? (_a = this._range) === null || _a === void 0 ? void 0 : _a[0] : 0;
        this._max = Array.isArray(this._range) ? (_b = this._range) === null || _b === void 0 ? void 0 : _b[1] : this._range;
    }
    /**
     * Get the minimum value of the range
     */
    get min() {
        return this._min;
    }
    /**
     * Get the maximum value of the range
     */
    get max() {
        return this._max;
    }
    /**
     * Get the current state of the timeline
     */
    get state() {
        return this._state;
    }
    /**
     * Get the current timestamp of the timeline
     */
    get currentTimestamp() {
        return this.current;
    }
    /**
     * Consume the global timestamp given by the **TimeProvider**
     * @param timestamp
     */
    consume(timestamp) {
        this.controller(timestamp);
        const ts = new Timestamp(this.current, timestamp);
        this.utilKeytimes.compare(ts);
        this.userKeytimes.compare(ts);
    }
    controller(timestamp) {
        var _a;
        this.initial || (this.initial = timestamp);
        switch (this._state) {
            case 'start':
                if (this.bank) {
                    this.initial += this.bank;
                    this.bank = null;
                }
                this.current = (timestamp - this.initial) * this.speed;
                this.taskObj && this.taskObj.run(new Timestamp(this.current, timestamp));
                if (this._range && ((Array.isArray(this._range) && ((_a = this._range) === null || _a === void 0 ? void 0 : _a[1]) <= this.current) || this._range <= this.current)) {
                    const end = () => {
                        for (const handler of this.finishHandlers)
                            handler();
                    };
                    if (this.loop) {
                        this.sync.reset();
                        this.start();
                    }
                    else {
                        this.sync.stop(end);
                    }
                }
                break;
            case 'stop':
                this.bank = (timestamp - this.initial - this.current) * this.speed;
                break;
            case 'reset':
                this._state = 'stop';
                this.current = 0;
                this.initial = 0;
                this.bank = null;
                if (this.taskObj)
                    this.taskObj.count = 0;
                break;
            default:
                console.error('Undefined state.');
                break;
        }
    }
    request(name, delay = 0, cb) {
        const req = (resolve, reject) => {
            this.utilKeytimes.keytime = {
                id: Date.now(),
                delay,
                callback: timestamp => {
                    this._state = name;
                    resolve(null);
                }
            };
        };
        return this.chain.add(req.bind(this), cb);
    }
    /**
     * Start the timeline
     * @param delay
     * @param callback
     * @returns Current timeline
     */
    start(delay, callback) {
        return this.request('start', delay, callback);
    }
    /**
     * Stop the timeline
     * @param delay
     * @param callback
     * @returns Current timeline
     */
    stop(delay, callback) {
        return this.request('stop', delay, callback);
    }
    /**
     * Reset the timeline
     * @param delay
     * @param callback
     * @returns Current timeline
     */
    reset(delay, callback) {
        return this.request('reset', delay, callback);
    }
    /**
     * Delete the timeline
     */
    delete() {
        TimeProvider.unsubscribe(this._id);
    }
    /**
     * Sets the timestamp in _milliseconds_
     * @param timestamp Timestamp in _milliseconds_
     */
    setTimestamp(timestamp) {
        this.current -= this.current - timestamp;
    }
    /**
     * Adds keytime during which a callback will be executed
     * @param keytime
     * @param keytime.timestamp The timestamp which will trigger the callback
     * @param keytime.callback The callback
     */
    addKeytime(keytime) {
        this.userKeytimes.add(keytime);
    }
    /**
     * Removes a Keytime
     * @param id
     */
    removeKeytime(id) {
        this.userKeytimes.remove(id);
    }
    /**
     * List all Keytimes
     * @returns Array of Keytimes
     */
    listKeytimes() {
        return this.userKeytimes.list;
    }
    /**
     * Appends an event listener to the _finish_ event, when the timeline reach its range.
     * @param listener
     */
    onFinish(listener) {
        this.finishHandlers.push(listener);
    }
    /**
     * Removes an event listener to the _finish_ event, when the timeline reach its range.
     * @param listener
     */
    offFinish(listener) {
        const idx = this.finishHandlers.indexOf(listener);
        if (idx !== -1)
            this.finishHandlers.splice(idx, 1);
    }
}
