import TimeProvider from './TimeProvider';
import Task from './Task';
import UserKeytimes from './UserKeytime';
import Chain from './Chain';
import UtilKeytimes from './UtilKeytimes';
import Timestamp from './Timestamp';
export default class Timeline {
    constructor(opts = {}) {
        this.bank = 0;
        this.initial = 0;
        this.current = 0;
        /**
         * The current state of the timeline
         */
        this.state = 'stop';
        const { id, speed: ratio, task, loop /* , range */ } = opts;
        this.id = (id => {
            if (id) {
                if (TimeProvider.checkId(id))
                    return id;
                else {
                    console.error(`ERROR: The "${id}" id has already been defined. (Timeline Library)`);
                    return Date.now();
                }
            }
            else
                return Date.now();
        })(id);
        this.speed = ratio || 1;
        this.task = task ? new Task(task) : null;
        this.loop = loop;
        this.userKeytimes = new UserKeytimes();
        this.chain = new Chain(this);
        this.utilKeytimes = new UtilKeytimes(this);
        TimeProvider.subscribe(this);
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
    /**
     * Set the id after afterwards
     * @param id
     */
    setId(id) {
        if (id) {
            if (TimeProvider.checkId(id))
                this.id = id;
            else
                console.error(`ERROR: The "${id}" id has already been defined. (Timeline Library)`);
        }
        else
            console.error('ERROR: Please specify an id. (Timeline Library)');
    }
    /**
     * Set the ratio afterwards
     * @param speed
     */
    setSpeed(speed) {
        this.speed = speed;
    }
    /**
     * Set the task afterwards
     * @param task
     */
    setTask(task) {
        this.task = new Task(task);
    }
    /**
     * Add keytime during which a callback will be executed
     * @param keytime
     * @param keytime.timestamp The timestamp which will trigger the callback
     * @param keytime.callback The callback
     */
    addKeytime(keytime) {
        this.userKeytimes.add(keytime);
    }
    /**
     * Remove a Keytime
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
    controller(timestamp) {
        if (!this.initial)
            this.initial = timestamp;
        switch (this.state) {
            case 'start':
                if (this.bank) {
                    this.initial += this.bank;
                    this.bank = null;
                }
                this.current = (timestamp - this.initial) * this.speed;
                this.task && this.task.run(new Timestamp(this.current, timestamp));
                if (this.loop && this.current >= this.loop)
                    this.reset().start();
                break;
            case 'stop':
                this.bank = (timestamp - this.initial - this.current) * this.speed;
                break;
            case 'reset':
                this.state = 'stop';
                this.current = 0;
                this.initial = 0;
                this.bank = null;
                if (this.task)
                    this.task.count = 0;
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
                    this.state = name;
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
        TimeProvider.unsubscribe(this.id);
    }
    setTimestamp(timestamp) {
        this.current -= this.current - timestamp;
    }
}
