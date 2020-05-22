let timeSubscribers = []

export default class TimeProvider {
    static loop(timestamp) {
        for (const consumer of timeSubscribers) consumer(timestamp)

        TimeProvider.requestId = requestAnimationFrame(TimeProvider.loop)
    }

    static start() {
        TimeProvider.requestId = requestAnimationFrame(TimeProvider.loop)
    }

    static subscribe(subscriber) {
        timeSubscribers.push(subscriber)
    }

    static checkId(id) {
        return timeSubscribers.every(sub => sub.id !== id)
    }

    static unsubscrabe(id) {

    }
}

TimeProvider.start()
