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
    initial: number;
    timestamp: number;
    constructor(context: Timeline);
    compare(ts: Timestamp): void;
}
