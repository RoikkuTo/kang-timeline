import Timeline from '@lib'

describe('Timeline', () => {
	const sleep = (duration: number) => new Promise(resolve => setTimeout(resolve, duration * 1000))

	it('should trigger the finish event', async () => {
		let bool = false
		let c = 0

		const timeline = new Timeline({ range: 1000 })

		timeline.start()
		timeline.onFinish(() => {
			bool = true
			c++
		})

		await sleep(2)

		expect(bool).toBe(true)
		expect(c).toBe(1)
	})
})
