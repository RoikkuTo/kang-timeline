import Time from './Time.js'
import Task from './Task.js'
import Keytime from './Keytime.js'
import Chain from './Chain.js'
import Util from './Util.js'
import Timestamp from './Timestamp.js'

export default class Timeline {
    constructor({ id, ratio, task/* , range */ }) {
        this.id = id || Date.now()
        this.ratio = ratio || 1
        this.task = task ? new Task(task) : null
        this.keytime = new Keytime()
        // this.range = range || [0, null, false]

        this.chain = new Chain(this)
        this.util = new Util(this)

        this.bank = 0
        this.initial = 0
        this.current = 0
        this.state = 'stop'

        Time.subscribe(this.consume.bind(this))
    }

    consume(timestamp) {
        this.controller(timestamp)
        this.util.compare(timestamp)
        this.keytime.compare(timestamp)
    }

    controller(timestamp) {
        if (!this.initial) this.initial = timestamp

        switch (this.state) {
            case 'start':
                if (this.bank) {
                    this.initial += this.bank
                    this.bank = null
                }
                this.current = (timestamp - this.initial) * this.ratio
                this.task && this.task.run(new Timestamp({
                    currentTime: this.current,
                    globalTime: timestamp
                }))
                break

            case 'stop':
                this.bank = (timestamp - this.initial - this.current) * this.ratio
                break

            case 'reset':
                this.state = 'stop'
                this.initial = 0
                this.current = 0
                break

            default:
                console.error('Undefined state.')
                break
        }
    }

    request(name, delay = 0) {
        const req = (resolve, reject) => {
            this.util.key = {
                delay,
                callback: timestamp => {
                    this.state = name
                    resolve()
                }
            }
        }
        return this.chain.add(req.bind(this))
    }

    start(delay) {
        return this.request('start', delay)
    }

    stop(delay) {
        return this.request('stop', delay)
    }

    reset(delay) {
        return this.request('reset', delay)
    }

    addKeytime(key) {
        this.keytime.add(key)
    }
}
