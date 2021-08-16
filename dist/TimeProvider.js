let timeSubscribers = [];
export default class TimeProvider {
    static loop(timestamp) {
        for (const subscriber of timeSubscribers)
            subscriber.consume(timestamp);
        TimeProvider.requestId = requestAnimationFrame(TimeProvider.loop);
    }
    static start() {
        TimeProvider.requestId = requestAnimationFrame(TimeProvider.loop);
    }
    static subscribe(subscriber) {
        timeSubscribers.push(subscriber);
    }
    static checkId(id) {
        return timeSubscribers.every(sub => sub.id !== id);
    }
    static unsubscribe(id) {
        const index = timeSubscribers.findIndex(sub => sub.id === id);
        if (index !== -1)
            timeSubscribers.splice(index, 1);
    }
}
TimeProvider.start();
