const request = require('request-promise-native'),
	states = new Map()
		.set(0, 'STATE_NONE')
		.set(1, 'STATE_ADDING')
		.set(2, 'STATE_CACHED')
		.set(3, 'STATE_NOT_FOUND')
		.set(4, 'STATE_BLACKLIST')
		.set(5, 'STATE_PRIVATE')

module.exports = {
	req(path, params) {
		return request({
			uri: this.endpoint + path,
			qs: Object.assign(this.globalParams, params),
			json: true
		})
	},

	firstCapital(string) {
		let split = string.split(' '), words = []
		for(const item of split)
			words.push(item[0].toUpperCase() + item.substring(1).toLowerCase())
		return words.join(' ')
	},

	//produce the status element for get() methods
	makeStatus(obj, category) {
		let { State, Updated } = obj.Info[category]
		obj.status = {
			ok: State === 2 ? true : false,
			id: State,
			state: states.get(State),
			updated: new Date(Updated * 1000)
		}
		return obj
	},

	//XIVAPI returns/expects numbers more than 10 digits long to be strings. we account for that here
	sanitizeInt(i) {
		if(i < 10000000000)
			return i
		else
			return i.toString()
	},

	cleanContent(entry) {
		entry.Icon = this.endpoint + entry.Icon
		entry.Url = this.endpoint + entry.Url
		return entry
	}
}
