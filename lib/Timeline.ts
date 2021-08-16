import TimeProvider from './TimeProvider'
import Task, { UserTask } from './Task'
import UserKeytimes, { UserKeytime } from './UserKeytime'
import Chain from './Chain'
import UtilKeytimes, { UtilKeytime } from './UtilKeytimes'
import Timestamp from './Timestamp'

interface opts {
	/**
	 * The *id* of the timeline
	 */
	id?: number | string
	/**
	 * Something
	 */
	speed?: number
	/**
	 * A task to be executed
	 */
	task?: UserTask

	/**
	 * Loop the animation after a given duration
	 */
	loop?: number
}

export default class Timeline {
	/**
	 * The *id* of the timeline
	 */
	id: opts['id']

	/**
	 * Something
	 */
	speed: number

	/**
	 * A task to be executed
	 */
	task: Task | null

	/**
	 * Loop the animation after a given duration
	 */
	loop?: number

	private userKeytimes: UserKeytimes

	private chain: Chain
	private utilKeytimes: UtilKeytimes

	private bank: number | null = 0
	private initial: number = 0
	private current: number = 0

	/**
	 * The current state of the timeline
	 */
	state: 'start' | 'stop' | 'reset' = 'stop'

	constructor(opts: opts = {}) {
		const { id, speed: ratio, task, loop /* , range */ } = opts
		this.id = (id => {
			if (id) {
				if (TimeProvider.checkId(id)) return id
				else {
					console.error(`ERROR: The "${id}" id has already been defined. (Timeline Library)`)
					return Date.now()
				}
			} else return Date.now()
		})(id)
		this.speed = ratio || 1
		this.task = task ? new Task(task) : null
		this.loop = loop

		this.userKeytimes = new UserKeytimes()

		this.chain = new Chain(this)
		this.utilKeytimes = new UtilKeytimes(this)

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

	/**
	 * Set the id after afterwards
	 * @param id
	 */
	setId(id: Timeline['id']) {
		if (id) {
			if (TimeProvider.checkId(id)) this.id = id
			else console.error(`ERROR: The "${id}" id has already been defined. (Timeline Library)`)
		} else console.error('ERROR: Please specify an id. (Timeline Library)')
	}

	/**
	 * Set the ratio afterwards
	 * @param speed
	 */
	setSpeed(speed: Timeline['speed']) {
		this.speed = speed
	}

	/**
	 * Set the task afterwards
	 * @param task
	 */
	setTask(task: UserTask) {
		this.task = new Task(task)
	}

	/**
	 * Add keytime during which a callback will be executed
	 * @param keytime
	 * @param keytime.timestamp The timestamp which will trigger the callback
	 * @param keytime.callback The callback
	 */
	addKeytime(keytime: Omit<UserKeytime, 'id'>) {
		this.userKeytimes.add(keytime)
	}

	/**
	 * Remove a Keytime
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

	private controller(timestamp: number) {
		if (!this.initial) this.initial = timestamp

		switch (this.state) {
			case 'start':
				if (this.bank) {
					this.initial += this.bank
					this.bank = null
				}
				this.current = (timestamp - this.initial) * this.speed
				this.task && this.task.run(new Timestamp(this.current, timestamp))
				if (this.loop && this.current >= this.loop) this.reset().start()
				break

			case 'stop':
				this.bank = (timestamp - this.initial - this.current) * this.speed
				break

			case 'reset':
				this.state = 'stop'
				this.current = 0
				this.initial = 0
				this.bank = null
				if (this.task) this.task.count = 0
				break

			default:
				console.error('Undefined state.')
				break
		}
	}

	private request(name: Timeline['state'], delay = 0, cb?: () => any) {
		const req: PromiseExecutor = (resolve, reject) => {
			this.utilKeytimes.keytime = {
				id: Date.now(),
				delay,
				callback: timestamp => {
					this.state = name
					resolve(null)
				}
			}
		}
		return this.chain.add(req.bind(this), cb)
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
		TimeProvider.unsubscribe(this.id)
	}

	setTimestamp(timestamp: number) {
		this.current -= this.current - timestamp
	}
}
