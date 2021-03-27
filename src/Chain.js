export default class Chain {
	constructor(context) {
		this.context = context
		this.link = null
	}

	add(request, callback = () => null) {
		const priv = this.link
		this.link = new Promise(async function (resolve, reject) {
			await priv
			await new Promise(request)
				.then(res => {
					callback(res)
					resolve()
				})
				.catch(err => {
					console.error('Missing resolve in the request function.')
					callback(err)
					reject()
				})
		})
		return this.context
	}
}
