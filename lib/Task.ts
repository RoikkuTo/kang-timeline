import Timestamp from './Timestamp'

export interface TaskParams extends Timestamp {
	count: number
}

export interface TaskOpts {
	frequency?: number
	run: TaskFunc
}

export type TaskFunc = (params: TaskParams) => void

export type UserTask = TaskOpts | TaskFunc

export default class Task {
	frequency: number = 0
	task: TaskFunc = () => null
	count: number = 0

	constructor(task: UserTask) {
		if (typeof task === 'object') {
			const { frequency, run } = task
			this.frequency = frequency || 0
			this.task = run
		} else if (typeof task === 'function') {
			this.frequency = 0
			this.task = task
		}
	}

	run(timestamp: Timestamp) {
		if (timestamp.currentTime % this.frequency > 0) {
			this.count++
			this.task({ ...timestamp, count: this.count })
		}
	}
}
