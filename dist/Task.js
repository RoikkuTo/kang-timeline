export default class Task {
    constructor(task) {
        this.frequency = 0;
        this.task = () => null;
        this.count = 0;
        if (typeof task === 'object') {
            const { frequency, run } = task;
            this.frequency = frequency || 0;
            this.task = run;
        }
        else if (typeof task === 'function') {
            this.frequency = 0;
            this.task = task;
        }
    }
    run(timestamp) {
        if (timestamp.currentTime % this.frequency > 0) {
            this.count++;
            this.task(Object.assign(Object.assign({}, timestamp), { count: this.count }));
        }
    }
}
