import Timeline from './Timeline'

export default class Chain {
	context: Timeline
	link: Promise<unknown> | null = null

	constructor(context: Timeline) {
		this.context = context
	}

	add(request: PromiseExecutor, callback = () => null) {
		const priv = this.link
		this.link = new Promise(async function (resolve, reject) {
			await priv
			await new Promise(request)
				// Can had callback params, why not
				.then(() => {
					callback()
					console.log('vu')
					resolve(null)
				})
				.catch(() => {
					console.error('Missing resolve in the request function.')
					callback()
					reject()
				})
		})
		return this.context
	}
}
