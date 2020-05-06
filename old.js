function Timer(settings) {
    const self = this
    let requestID = null
    let memory = {
        timestamp: null,
        inheritence: null,
        timeline: [],
        keytime: {
            list: [],
            index: 0,

            add(key) {
                this.list.push(key)
                this.list.sort((a, b) => b.timestamp - a.timestamp)
            },
            exec(timestamp) {
                if (this.list[this.index] && this.list[this.index].timestamp <= timestamp) {
                    this.list[this.index].callback(timestamp)
                    this.index++
                }
            }
        }
    }
    let state = {
        isStarted: false,
        isPausing: false,
        isRecording: false,
        resolve: () => null
    }

    this.ratio = settings.multilpicator || 1
    this.callback = settings.callback || (() => null)

    this.loop = (permormance, timestamp, initial = null, inheritence = null) => {
        if (initial === null) initial = (memory.timestamp || 0) - permormance
        if (inheritence === null && memory.inheritence) inheritence = memory.inheritence

        if (state.isPausing) {
            cancelAnimationFrame(requestID)
            memory = { ...memory, timestamp, inheritence }
            state.resolve(state)
        } else if (state.isStarted) {
            memory.keytime.exec(timestamp)

            timestamp = this.ratio * (permormance + initial)
            inheritence = this.callback(inheritence, { permormance, timestamp })
            requestID = requestAnimationFrame(permormance => this.loop(permormance, timestamp, initial, inheritence))
        }
    }

    this.addKeytime = options => memory.keytime.add(options)

    this.chain = {
        link: null,

        set addLink(link) {
            this.link = link
        },

        chain(func, callback = () => null) {
            const private = this.link
            this.addLink = new Promise(async function (resolve, reject) {
                await private
                await new Promise((resolve, reject) => func(resolve, reject))
                    .then(res => {
                        callback(res)
                        resolve()
                    })
                    .catch(err => {
                        console.log('errr')
                        callback(err)
                        reject()
                    })
            })
            return self
        }
    }

    this.clearMemory = () => {
        memory.timestamp = null
        memory.inheritence = null
        memory.keytime.index = 0
    }

    this.start = callback => {
        const func = (resolve, reject) => {
            state.isPausing = false
            state.isStarted = true
            requestID = requestAnimationFrame(this.loop)
            resolve(state)
        }

        return this.chain.chain(func, callback)
    }

    this.pause = callback => {
        const func = (resolve) => {
            if (state.bool !== 'pause') {
                state.isStarted = false
                state.isPausing = true
                state.resolve = resolve
            } else
                resolve(state)
        }

        return this.chain.chain(func, callback)
    }

    this.reset = callback => {
        const func = (resolve) => {
            this.pause(() => {
                this.clearMemory()
                resolve(state)
            })
        }

        return this.chain.chain(func, callback)
    }

    this.restart = callback => {
        const func = (resolve) => {
            this.reset().start(resolve)
        }

        return this.chain.chain(func, callback)
    }

    this.record = callback => {
        const func = (resolve) => {
            state.isRecording = !state.isRecording
            resolve(state)
        }

        return this.chain.chain(func, callback)
    }
}

const i = (count = 0, { permormance, timestamp }) => {
    count++
    document.getElementById('permormance').innerHTML = permormance
    document.getElementById('timestamp').innerHTML = timestamp
    document.getElementById('count').innerHTML = count
    return count
}

const test = new Timer({
    callback: i
})

test.addKeytime({
    timestamp: 5000,
    callback: timstamp => {
        console.log(timstamp)
        test.restart()
    }
})

// EVENTS
document.getElementsByClassName('start')[1].addEventListener('mousedown', () => test.start(state => toggle(state)))

document.getElementsByClassName('pause')[1].addEventListener('mousedown', () => test.pause(state => toggle(state)))

document.getElementsByClassName('reset')[1].addEventListener('mousedown', () => {
    test.reset(() => {
        document.getElementById('permormance').innerHTML = 0
        document.getElementById('timestamp').innerHTML = 0
        document.getElementById('count').innerHTML = 0
    })
})

document.getElementsByClassName('restart')[1].addEventListener('mousedown', () => test.restart(state => toggle(state)))

document.getElementsByClassName('record')[0].addEventListener('mousedown', () => test.record(state => toggle(state)))

const toggle = state => {
    if (state.isStarted) document.getElementsByClassName('start')[1].classList.add('starting')
    else document.getElementsByClassName('start')[1].classList.remove('starting')

    if (state.isPausing) document.getElementsByClassName('pause')[1].classList.add('pausing')
    else document.getElementsByClassName('pause')[1].classList.remove('pausing')

    if (state.isRecording) document.getElementsByClassName('record')[0].classList.add('recording')
    else document.getElementsByClassName('record')[0].classList.remove('recording')
}
