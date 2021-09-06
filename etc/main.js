const perf = new Timeline({
	id: 'perf',
	range: 1000,
	task: {
		run: ({ globalTime, currentTime }) => {
			document.getElementById('permormance').innerHTML = globalTime
			document.getElementById('timestamp').innerHTML = currentTime
			const t = new Date(currentTime).toJSON()
			const regex = /.*T(.*)Z/
			const match = regex.exec(t)
			document.getElementById('chrono').innerHTML = match?.[1] || '-- : -- : --'
		}
	}
})

const perf2 = new Timeline({ range: 250 })
perf2.start()
const perf3 = new Timeline({ range: 250 })
perf3.start()
const perf4 = new Timeline({ range: 250 })
perf4.start()
const perf5 = new Timeline({ range: 250 })
perf5.start()
const perf6 = new Timeline({ range: 250 })
perf6.start()
const perf7 = new Timeline({ range: 250 })
perf7.start()
const perf8 = new Timeline({ range: 250 })
perf8.start()
const perf9 = new Timeline({ range: 250 })
perf9.start()
const perf9 = new Timeline({ range: 250 })
perf9.start()
const perf10 = new Timeline({ range: 250 })
perf10.start()
const perf11 = new Timeline({ range: 250 })
perf11.start()
const perf12 = new Timeline({ range: 250 })
perf12.start()
const perf13 = new Timeline({ range: 250 })
perf13.start()

perf.addKeytime({
	timestamp: 5000,
	task: () => {
		console.log('vu')
	}
})

document.getElementsByClassName('start')[1].addEventListener('mousedown', () => perf.start())

document.getElementsByClassName('pause')[1].addEventListener('mousedown', () => perf.stop())

document.getElementsByClassName('reset')[1].addEventListener('mousedown', () => perf.reset())

document.getElementsByClassName('restart')[1].addEventListener('mousedown', () => perf.reset().start())
