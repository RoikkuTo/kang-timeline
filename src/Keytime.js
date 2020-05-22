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

    remove(id) {
        const target = this.list.map(kt => kt.id).indexOf(id)
        this.list.splice(target, 0)
        this.index--
    }

    compare(ts) {
        if (this.list[this.index] && this.list[this.index]
            .currentTime <= ts.currentTime) {
            this.list[this.index].run(ts)
            this.index++
        }
    }
}
