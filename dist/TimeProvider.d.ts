import Timeline from './Timeline';
export default class TimeProvider {
    static requestId: number;
    static loop(timestamp: number): void;
    static start(): void;
    static stop(): void;
    static subscribe(subscriber: Timeline): void;
    static checkId(id: Timeline['id']): boolean;
    static unsubscribe(id: Timeline['id']): void;
}
