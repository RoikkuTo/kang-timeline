import Timestamp from './Timestamp';
export interface TaskParams extends Timestamp {
    count: number;
}
export interface TaskOpts {
    frequency?: number;
    run: TaskFunc;
}
export declare type TaskFunc = (params: TaskParams) => void;
export declare type UserTask = TaskOpts | TaskFunc;
export default class Task {
    frequency: number;
    task: TaskFunc;
    count: number;
    constructor(task: UserTask);
    run(timestamp: Timestamp): void;
}
