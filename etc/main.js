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

perf.start()

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
