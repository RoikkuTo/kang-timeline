import Timeline from './Timeline'

let timeSubscribers: Timeline[] = []

export default class TimeProvider {
	static requestId: number

	static loop(timestamp: number) {
		for (const subscriber of timeSubscribers) subscriber.consume(timestamp)

		TimeProvider.requestId = requestAnimationFrame(TimeProvider.loop)
	}

	static start() {
		TimeProvider.requestId = requestAnimationFrame(TimeProvider.loop)
	}

	static stop() {
		cancelAnimationFrame(TimeProvider.requestId)
	}

	static subscribe(subscriber: Timeline) {
		timeSubscribers.push(subscriber)
	}

	static checkId(id: Timeline['id']) {
		return timeSubscribers.every(sub => sub.id !== id)
	}

	static unsubscribe(id: Timeline['id']) {
		const index = timeSubscribers.findIndex(sub => sub.id === id)
		if (index !== -1) timeSubscribers.splice(index, 1)
	}
}

TimeProvider.start()
