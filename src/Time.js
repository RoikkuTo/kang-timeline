let timeSubscribers = []

export default class Time {
    static loop(timestamp) {
        for (const consumer of timeSubscribers) consumer(timestamp)

        Time.requestId = requestAnimationFrame(Time.loop)
    }

    static start() {
        Time.requestId = requestAnimationFrame(Time.loop)
    }

    static subscribe(subscriber) {
        timeSubscribers.push(subscriber)
    }
}

Time.start()
