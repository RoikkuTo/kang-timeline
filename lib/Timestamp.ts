export default class Timestamp {
	currentTime: number
	globalTime: number

	constructor(currentTime: number, globalTime: number) {
		this.currentTime = currentTime
		this.globalTime = globalTime
	}
}