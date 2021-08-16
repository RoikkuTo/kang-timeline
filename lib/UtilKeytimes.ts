import Timeline from './Timeline'
import Timestamp from './Timestamp'

export interface UtilKeytime {
	id: number
	delay: number
	callback: (timestamp: Timestamp) => void
}

export default class UtilKeytimes {
	context: Timeline
	temp: number | null = null
	keytime: UtilKeytime | null = null
	initial: number = 0
	timestamp: number = 0

	constructor(context: Timeline) {
		this.context = context
	}

	compare(ts: Timestamp) {
		if (this.keytime) {
			if (this.temp === null) this.temp = ts.globalTime + this.keytime.delay
			if (this.temp !== null && this.temp <= ts.globalTime) {
				this.keytime.callback(ts)
				this.keytime = null
				this.temp = null
			}
		}
	}
}
