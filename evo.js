let timeSubscribers = []

class Time {
    static loop(timestamp) {
        timeSubscribers.forEach(consumer => consumer(timestamp))

        Time.requestId = requestAnimationFrame(Time.loop)
    }

    static start() {
        Time.requestId = requestAnimationFrame(Time.loop)
    }

    static subscribe(subscriber) {
        timeSubscribers.push(subscriber)
    }
}

Time.start()

class Timestamp {
    constructor({ currentTime, globalTime }) {
        this.currentTime = currentTime
        this.globalTime = globalTime
    }
}

class Task {
    constructor(task) {
        if (typeof task === 'object') {
            const { frequency, run } = task
            this.frequency = frequency || 0
            this.task = run
        } else if (typeof task === 'function') {
            this.frequency = 0
            this.task = task
        }
        this.count = 0
    }

    run(timestamp) {
        if (timestamp.currentTime >= this.frequency * this.count) {
            this.count++
            this.task({ ...timestamp, count: this.count })
        }
    }
}

class Chain {
    constructor(context) {
        this.context = context
        this.link = null
    }

    add(request, callback = () => null) {
        const priv = this.link
        this.link = new Promise(async function (resolve, reject) {
            await priv
            await new Promise((resolve, reject) => request(resolve, reject))
                .then(res => {
                    callback(res)
                    resolve()
                })
                .catch(err => {
                    console.error('Missing resolve in the request function.')
                    callback(err)
                    reject()
                })
        })
        return this.context
    }
}

class Util {
    constructor(context) {
        this.context = context
        this.temp = null
        this.key = null
        this.initial = 0
        this.timestamp = 0
    }

    compare(timestamp) {
        if (this.key) {
            if (this.temp === null) this.temp = timestamp + this.key.delay
            if (this.temp !== null && this.temp <= timestamp) {
                this.key.callback(timestamp)
                this.key = null
                this.temp = null
            }
        }
    }
}

class Keytime {
    constructor() {
        this.list = []
        this.index = 0
    }

    add(key) {
        this.list.push(key)
        this.list.sort((a, b) => {
            if (a.timestamp < b.timestamp)
                return -1
            if (a.timestamp > b.timestamp)
                return 1
            return 0
        })
    }

    compare(timestamp) {
        if (this.list[this.index] && this.list[this.index].timestamp <= timestamp) {
            this.list[this.index].callback(timestamp)
            this.index++
        }
    }
}

class Timeline {
    constructor({ id, ratio, task, range }) {
        this.id = id || Date.now()
        this.ratio = ratio || 1
        this.task = task ? new Task(task) : null
        // this.range = range || [0, null, false]

        this.chain = new Chain(this)

        this.util = new Util(this)

        this.bank = 0
        this.initial = 0
        this.current = 0
        this.state = 'stop'

        this.keytime = new Keytime()

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

    addKeytime(key) {
        this.keytime.add(key)
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
}

// export default Timeline
