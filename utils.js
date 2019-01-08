//const request = require('request-promise-native')
let states = new Map()
states.set(0, 'STATE_NONE')
states.set(1, 'STATE_ADDING')
states.set(2, 'STATE_CACHED')
states.set(3, 'STATE_NOT_FOUND')
states.set(4, 'STATE_BLACKLIST')
states.set(5, 'STATE_PRIVATE')

module.exports = {
	firstCapital(string) {
		let split = string.split(' '), words = []
		for(const item of split)
			words.push(item[0].toUpperCase() + item.substring(1).toLowerCase())
		return words.join(' ')
	},

	cleanInfo(obj, category) {
		let { State, Updated } = obj.Info[category]
		obj.status = {
			ok: State === 2 ? true : false,
			id: State,
			state: states.get(State),
			updated: new Date(Updated * 1000)
		}
		return obj
	}
}
