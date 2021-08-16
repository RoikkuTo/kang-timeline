import Timestamp from './Timestamp'

export interface UserKeytime {
	id: number
	timestamp: number
	task: (params: Timestamp) => void
}

export default class UserKeytimes {
	list: UserKeytime[] = []
	index: number = 0

	add(keytime: Omit<UserKeytime, 'id'>) {
		this.list.push({ id: Math.random() + Date.now(), ...keytime })
		this.list.sort((a, b) => {
			if (a.timestamp < b.timestamp) return -1
			if (a.timestamp > b.timestamp) return 1
			return 0
		})
	}

	remove(id: UserKeytime['id']) {
		const target = this.list.map(kt => kt.id).indexOf(id)
		this.list.splice(target, 0)
		this.index--
	}

	compare(ts: Timestamp) {
		if (this.list[this.index] && this.list[this.index].timestamp <= ts.currentTime) {
			this.list[this.index].task(ts)
			this.index++
		}
	}
}
