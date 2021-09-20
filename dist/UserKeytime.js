export default class UserKeytimes {
    constructor() {
        this.list = [];
        this.index = 0;
    }
    add(keytime) {
        this.list.push(Object.assign({ id: Math.random() + Date.now() }, keytime));
        this.list.sort((a, b) => {
            if (a.timestamp < b.timestamp)
                return -1;
            if (a.timestamp > b.timestamp)
                return 1;
            return 0;
        });
    }
    remove(id) {
        const target = this.list.map(kt => kt.id).indexOf(id);
        this.list.splice(target, 1);
        this.index--;
    }
    compare(ts) {
        if (this.list[this.index] && this.list[this.index].timestamp <= ts.currentTime) {
            this.list[this.index].task(ts);
            this.index++;
        }
    }
}
