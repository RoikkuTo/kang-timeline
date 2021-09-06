import Timeline from '../lib/Timeline'

describe('Timeline', () => {
	/**
	 * Sleep
	 * @param duration in seconds
	 */
	const sleep = (duration: number) =>
		new Promise((resolve, reject) => {
			return setTimeout(resolve, duration * 1000)
		})

	// beforeEach(() => {
	// 	jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb)
	// })

	it('should trigger the finish event', async () => {
		let bool = false
		let c = 0
		const timeline = new Timeline({ range: 1000 })

		timeline.start()
		timeline.onFinish(() => {
			bool = true
			c++
		})

		sleep(2)
		expect(bool).toBe(true)
		expect(c).toBe(1)
	})

	// afterEach(() => {
	// 	window.requestAnimationFrame.mockRestore()
	// })
})
