import Timeline from './Timeline';
import Timestamp from './Timestamp';
export interface UtilKeytime {
    id: number;
    delay: number;
    callback: (timestamp: Timestamp) => void;
}
export default class UtilKeytimes {
    context: Timeline;
    temp: number | null;
    keytime: UtilKeytime | null;
    timestamp: number;
    constructor(context: Timeline);
    compare(ts: Timestamp): void;
}
//# sourceMappingURL=UtilKeytimes.d.ts.map