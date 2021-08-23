export default class UtilKeytimes {
    constructor(context) {
        this.temp = null;
        this.keytime = null;
        this.timestamp = 0;
        this.context = context;
    }
    compare(ts) {
        if (this.keytime) {
            if (this.temp === null)
                this.temp = ts.globalTime + this.keytime.delay;
            if (this.temp !== null && this.temp <= ts.globalTime) {
                this.keytime.callback(ts);
                this.keytime = null;
                this.temp = null;
            }
        }
    }
}
