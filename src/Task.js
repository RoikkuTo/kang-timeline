export default class Task {
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
