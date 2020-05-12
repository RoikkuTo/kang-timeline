export default class Util {
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
