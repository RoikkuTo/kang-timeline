import Task, { UserTask } from './Task';
import { UserKeytime } from './UserKeytime';
import { UtilKeytime } from './UtilKeytimes';
interface opts {
    /**
     * The *id* of the timeline
     */
    id?: number | string;
    /**
     * Something
     */
    speed?: number;
    /**
     * A task to be executed
     */
    task?: UserTask;
    /**
     * Loop the animation after a given duration
     */
    loop?: number;
}
export default class Timeline {
    /**
     * The *id* of the timeline
     */
    id: opts['id'];
    /**
     * Something
     */
    speed: number;
    /**
     * A task to be executed
     */
    task: Task | null;
    /**
     * Loop the animation after a given duration
     */
    loop?: number;
    private userKeytimes;
    private chain;
    private utilKeytimes;
    private bank;
    private initial;
    private current;
    /**
     * The current state of the timeline
     */
    state: 'start' | 'stop' | 'reset';
    constructor(opts?: opts);
    /**
     * Consume the global timestamp given by the **TimeProvider**
     * @param timestamp
     */
    consume(timestamp: number): void;
    /**
     * Set the id after afterwards
     * @param id
     */
    setId(id: Timeline['id']): void;
    /**
     * Set the ratio afterwards
     * @param speed
     */
    setSpeed(speed: Timeline['speed']): void;
    /**
     * Set the task afterwards
     * @param task
     */
    setTask(task: UserTask): void;
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
    setTimestamp(timestamp: number): void;
}
export {};
