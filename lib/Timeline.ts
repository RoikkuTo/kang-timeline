import TimeProvider from './TimeProvider'
import Task, { UserTask } from './Task'
import UserKeytimes, { UserKeytime } from './UserKeytime'
import Chain from './Chain'
import UtilKeytimes, { UtilKeytime } from './UtilKeytimes'
import Timestamp from './Timestamp'
import { nanoid } from 'nanoid'

export interface TimelineOpts {
	/**
	 * The *id* of the timeline
	 *
	 * All Timelines have a unique _id_ which is basically a simple `Date.now()` in milliseconds but you can specify a one.
	 */
	id?: number | string

	/**
	 * The speed of the timeline
	 *
	 * The speed define how fast the time should pass.
	 * It can be less than 0 or greater than 1 but the current timestamp will obviously be negative and less precise respectively.
	 */
	speed?: number

	/**
	 * The task to be executed by the timeline
	 *
	 * Task is executed at each loop iterration.
	 * It can be a simple function or an object with a function to execute at a given frequency.
	 */
	task?: UserTask

	/**
	 * The range for the timeline
	 *
	 * A range between which the timeline will be effective, with the first index being the _minimum_ and the second being the _maximum_.
	 * If set as a number, the range become `[0, number]` with 0 as minimum.
	 */
	range?: number | [number, number]

	/**
	 * Loop the animation after a given duration
	 */
	loop?: boolean
}

interface SyncControl {
	/**
	 * Start the timeline synchronously, which is faster and much precise.
	 */
	start(callback?: () => void): void
	/**
	 * Stop the timeline synchronously, which is faster and much precise.
	 */
	stop(callback?: () => void): void
	/**
	 * Rester the timeline synchronously, which is faster and much precise.
	 */
	reset(callback?: () => void): void
}

export default class Timeline {
	private _id: NonNullable<TimelineOpts['id']> = nanoid()
	private _task?: NonNullable<TimelineOpts['task']> | null
	private _range: NonNullable<TimelineOpts['range']> | null = null

	private _state: 'start' | 'stop' | 'reset' = 'stop'

	private userKeytimes: UserKeytimes

	private chain: Chain
	private utilKeytimes: UtilKeytimes
	private taskObj: Task | null = null

	private bank: number | null = null
	private initial: number = 0
	private current: number = 0

	private _min: number = 0
	private _max: number | null = null
	private finishHandlers: (() => void)[] = []

	/**
	 * The speed of the timeline
	 *
	 * The speed define how fast the time should pass.
	 * It can be less than 0 or greater than 1 but the current timestamp will obviously be negative and less precise respectively.
	 */
	speed: number

	/**
	 * Loop the animation after a given duration
	 */
	loop: boolean

	isFinished: boolean = false

	/**
	 * The *id* of the timeline
	 *
	 * All Timelines have a unique _id_ which is basically a simple `Date.now()` in milliseconds but you can specify a one.
	 */
	get id() {
		return this._id
	}
	set id(id) {
		// if (id) {
		if (TimeProvider.checkId(id)) this._id = id
		else console.error(`ERROR: The "${id}" id has already been defined. (Timeline Library)`)
		// } else console.error('ERROR: Please specify an id. (Timeline Library)')
	}

	/**
	 * The task to be executed by the timeline
	 *
	 * Task is executed at each loop iterration.
	 * It can be a simple function or an object with a function to execute at a given frequency.
	 */
	get task() {
		return this._task as UserTask
	}
	set task(task: UserTask | null) {
		this._task = task
		this.taskObj = task ? new Task(task) : null
	}

	/**
	 * The range for the timeline
	 *
	 * A range between which the timeline will be effective, with the first index being the _minimum_ and the second being the _maximum_.
	 * If set as a number, the range become `[0, number]` with 0 as minimum.
	 */
	get range() {
		return this._range
	}
	set range(range) {
		this._range = range
		this._min = Array.isArray(this._range) ? this._range?.[0] : 0
		this._max = Array.isArray(this._range) ? this._range?.[1] : this._range
	}

	/**
	 * Get the minimum value of the range
	 */
	get min() {
		return this._min
	}

	/**
	 * Get the maximum value of the range
	 */
	get max() {
		return this._max
	}

	/**
	 * Get the current state of the timeline
	 */
	get state() {
		return this._state
	}

	/**
	 * Get the current timestamp of the timeline
	 */
	get currentTimestamp() {
		return this.current
	}

	constructor({ id, speed, task, loop, range }: TimelineOpts = {}) {
		if (id) this.id = id
		this.speed = speed || 1
		if (task) this.task = task
		if (range) this.range = range
		this.loop = !!loop

		this.userKeytimes = new UserKeytimes()

		this.chain = new Chain(this)
		this.utilKeytimes = new UtilKeytimes(this)

		if (Array.isArray(this._range)) this.current = this._range?.[0]

		TimeProvider.subscribe(this)
	}

	/**
	 * Consume the global timestamp given by the **TimeProvider**
	 * @param timestamp
	 */
	consume(timestamp: number) {
		this.controller(timestamp)

		const ts = new Timestamp(this.current, timestamp)
		this.utilKeytimes.compare(ts)
		this.userKeytimes.compare(ts)
	}

	private controller(timestamp: number) {
		this.initial ||= timestamp - (Array.isArray(this._range) ? this._range[0] : 0)

		switch (this._state) {
			case 'start':
				if (this.bank) {
					this.initial += this.bank
					this.bank = null
				}
				if (this.isFinished) this.isFinished = false
				this.current = (timestamp - this.initial) * this.speed
				this.taskObj && this.taskObj.run(new Timestamp(this.current, timestamp))
				if (this._range && ((Array.isArray(this._range) && this._range?.[1] <= this.current) || this._range <= this.current)) {
					const end = () => {
						for (const handler of this.finishHandlers) handler()
					}
					if (this.loop) {
						this.sync.reset()
						this.start()
					} else {
						this.isFinished = true
						this.sync.stop(end)
					}
				}
				break

			case 'stop':
				this.bank = (timestamp - this.initial - this.current) * this.speed
				break

			case 'reset':
				this._state = 'stop'
				this.current = Array.isArray(this._range) ? this._range[0] : 0
				this.initial = 0
				this.bank = null
				if (this.taskObj) this.taskObj.count = 0
				break

			default:
				console.error('Undefined state.')
				break
		}
	}

	private request(name: Timeline['_state'], delay = 0, cb?: () => any) {
		const req: PromiseExecutor = (resolve, reject) => {
			this.utilKeytimes.keytime = {
				id: Date.now(),
				delay,
				callback: () => {
					this._state = name
					resolve(null)
				}
			}
		}
		return this.chain.add(req.bind(this), cb)
	}

	/**
	 * Synchronous control methods
	 *
	 * Faster and much MUCH more precise controls but less options.
	 */
	sync: SyncControl = {
		start: callback => {
			this._state = 'start'
			callback?.()
		},
		stop: callback => {
			this._state = 'stop'
			callback?.()
		},
		reset: callback => {
			this._state = 'reset'
			callback?.()
		}
	}

	/**
	 * Start the timeline
	 * @param delay
	 * @param callback
	 * @returns Current timeline
	 */
	start(delay?: number, callback?: () => void) {
		return this.request('start', delay, callback)
	}

	/**
	 * Stop the timeline
	 * @param delay
	 * @param callback
	 * @returns Current timeline
	 */
	stop(delay?: number, callback?: () => void) {
		return this.request('stop', delay, callback)
	}

	/**
	 * Reset the timeline
	 * @param delay
	 * @param callback
	 * @returns Current timeline
	 */
	reset(delay?: number, callback?: () => void) {
		return this.request('reset', delay, callback)
	}

	/**
	 * Delete the timeline
	 */
	delete() {
		TimeProvider.unsubscribe(this._id)
	}

	/**
	 * Sets the timestamp in _milliseconds_
	 * @param timestamp Timestamp in _milliseconds_
	 */
	setTimestamp(timestamp: number) {
		this.current -= this.current - timestamp
	}

	/**
	 * Adds keytime during which a callback will be executed
	 * @param keytime
	 * @param keytime.timestamp The timestamp which will trigger the callback
	 * @param keytime.callback The callback
	 */
	addKeytime(keytime: Omit<UserKeytime, 'id'>) {
		this.userKeytimes.add(keytime)
	}

	/**
	 * Removes a Keytime
	 * @param id
	 */
	removeKeytime(id: UtilKeytime['id']) {
		this.userKeytimes.remove(id)
	}

	/**
	 * List all Keytimes
	 * @returns Array of Keytimes
	 */
	listKeytimes() {
		return this.userKeytimes.list
	}

	/**
	 * Appends an event listener to the _finish_ event, when the timeline reach its range.
	 * @param listener
	 */
	onFinish(listener: () => void) {
		this.finishHandlers.push(listener)
	}

	/**
	 * Removes an event listener to the _finish_ event, when the timeline reach its range.
	 * @param listener
	 */
	offFinish(listener: () => void) {
		const idx = this.finishHandlers.indexOf(listener)
		if (idx !== -1) this.finishHandlers.splice(idx, 1)
	}
}
