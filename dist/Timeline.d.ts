import { UserTask } from './Task';
import { UserKeytime } from './UserKeytime';
import { UtilKeytime } from './UtilKeytimes';
export interface TimelineOpts {
    /**
     * The *id* of the timeline
     *
     * All Timelines have a unique _id_ which is basically a simple `Date.now()` in milliseconds but you can specify a one.
     */
    id?: number | string;
    /**
     * The speed of the timeline
     *
     * The speed define how fast the time should pass.
     * It can be less than 0 or greater than 1 but the current timestamp will obviously be negative and less precise respectively.
     */
    speed?: number;
    /**
     * The task to be executed by the timeline
     *
     * Task is executed at each loop iterration.
     * It can be a simple function or an object with a function to execute at a given frequency.
     */
    task?: UserTask;
    /**
     * The range for the timeline
     *
     * A range between which the timeline will be effective, with the first index being the _minimum_ and the second being the _maximum_.
     * If set as a number, the range become `[0, number]` with 0 as minimum.
     */
    range?: number | [number, number];
    /**
     * Loop the animation after a given duration
     */
    loop?: boolean;
}
export default class Timeline {
    private _id;
    private _task?;
    private _range;
    private _state;
    private userKeytimes;
    private chain;
    private utilKeytimes;
    private taskObj;
    private bank;
    private initial;
    private current;
    private _min;
    private _max;
    /**
     * The speed of the timeline
     *
     * The speed define how fast the time should pass.
     * It can be less than 0 or greater than 1 but the current timestamp will obviously be negative and less precise respectively.
     */
    speed: number;
    /**
     * Loop the animation after a given duration
     */
    loop: boolean;
    /**
     * The *id* of the timeline
     *
     * All Timelines have a unique _id_ which is basically a simple `Date.now()` in milliseconds but you can specify a one.
     */
    get id(): string | number;
    set id(id: string | number);
    /**
     * The task to be executed by the timeline
     *
     * Task is executed at each loop iterration.
     * It can be a simple function or an object with a function to execute at a given frequency.
     */
    get task(): UserTask | null;
    set task(task: UserTask | null);
    /**
     * The range for the timeline
     *
     * A range between which the timeline will be effective, with the first index being the _minimum_ and the second being the _maximum_.
     * If set as a number, the range become `[0, number]` with 0 as minimum.
     */
    get range(): number | [number, number] | null;
    set range(range: number | [number, number] | null);
    /**
     * Get the minimum value of the range
     */
    get min(): number;
    /**
     * Get the maximum value of the range
     */
    get max(): number | null;
    /**
     * Get the current state of the timeline
     */
    get state(): "start" | "stop" | "reset";
    constructor({ id, speed, task, loop, range }?: TimelineOpts);
    /**
     * Consume the global timestamp given by the **TimeProvider**
     * @param timestamp
     */
    consume(timestamp: number): void;
    private controller;
    private request;
    /**
     * Start the timeline
     * @param delay
     * @param callback
     * @returns Current timeline
     */
    start(delay?: number, callback?: () => void): Timeline;
    /**
     * Stop the timeline
     * @param delay
     * @param callback
     * @returns Current timeline
     */
    stop(delay?: number, callback?: () => void): Timeline;
    /**
     * Reset the timeline
     * @param delay
     * @param callback
     * @returns Current timeline
     */
    reset(delay?: number, callback?: () => void): Timeline;
    /**
     * Delete the timeline
     */
    delete(): void;
    /**
     * Set the timestamp in _milliseconds_
     * @param timestamp Timestamp in _milliseconds_
     */
    setTimestamp(timestamp: number): void;
    /**
     * Add keytime during which a callback will be executed
     * @param keytime
     * @param keytime.timestamp The timestamp which will trigger the callback
     * @param keytime.callback The callback
     */
    addKeytime(keytime: Omit<UserKeytime, 'id'>): void;
    /**
     * Remove a Keytime
     * @param id
     */
    removeKeytime(id: UtilKeytime['id']): void;
    /**
     * List all Keytimes
     * @returns Array of Keytimes
     */
    listKeytimes(): UserKeytime[];
}
