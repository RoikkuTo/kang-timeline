let timeSubscribers = []

export default class Time {
    static loop(timestamp) {
        timeSubscribers.forEach(consumer => consumer(timestamp))

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
