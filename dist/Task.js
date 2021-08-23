export default class Task {
    constructor(task) {
        this.frequency = 1;
        this.task = () => null;
        this.count = 0;
        if (typeof task === 'object') {
            const { frequency, run } = task;
            this.frequency = frequency || 1;
            this.task = run;
        }
        else if (typeof task === 'function') {
            this.task = task;
        }
    }
    run(timestamp) {
        if (this.task && timestamp.currentTime % this.frequency > 0) {
            this.count++;
            this.task(Object.assign(Object.assign({}, timestamp), { count: this.count }));
        }
    }
}
