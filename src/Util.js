export default class Util {
    constructor(context) {
        this.context = context
        this.temp = null
        this.key = null
        this.initial = 0
        this.timestamp = 0
    }

    compare(ts) {
        if (this.key) {
            if (this.temp === null) this.temp = ts.currentTime + this.key.delay
            if (this.temp !== null && this.temp <= ts.currentTime) {
                this.key.callback(ts)
                this.key = null
                this.temp = null
            }
        }
    }
}
