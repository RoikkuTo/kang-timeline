// import Timeline from './evo

const perf = new Timeline({
    task: ({ globalTime }) => {
        document.getElementById('permormance').innerHTML = globalTime
    }
})

perf.start()

const sub = new Timeline({
    id: 'sub',
    ratio: 0.5,
    task: {
        frequency: 500,
        run: ({ currentTime }) => {
            document.getElementById('timestamp').innerHTML = currentTime
        }
    }
})


document.getElementsByClassName('start')[1].addEventListener('mousedown', () => sub.start())

document.getElementsByClassName('pause')[1].addEventListener('mousedown', () => sub.stop())

document.getElementsByClassName('reset')[1].addEventListener('mousedown', () => sub.reset())

document.getElementsByClassName('restart')[1].addEventListener('mousedown', () => sub.reset().start())
