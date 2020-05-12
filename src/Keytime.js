export default class Keytime {
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
