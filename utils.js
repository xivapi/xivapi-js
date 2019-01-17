const request = require('request-promise-native'),
	stateNames = new Map()
		.set(0, 'STATE_NONE')
		.set(1, 'STATE_ADDING')
		.set(2, 'STATE_CACHED')
		.set(3, 'STATE_NOT_FOUND')
		.set(4, 'STATE_BLACKLIST')
		.set(5, 'STATE_PRIVATE')

module.exports = {
	//standard request function
	req(path, params) {
		return request({
			uri: this.endpoint + path,
			qs: Object.assign(this.globalParams, params),
			json: true
		})
	},

	//JSON request function
	reqJSON(path, body) {
		return request({
			uri: this.endpoint + path,
			body: body,
			json: true
		})
	},

	//proper Upper Case for strings
	firstCapital(string) {
		let split = string.split(' '), words = []
		for(const item of split)
			words.push(item[0].toUpperCase() + item.substring(1).toLowerCase())
		return words.join(' ')
	},

	//produce the status field for get() methods
	makeStatus(obj, category) {
		let snake_case = this.globalParams.snake_case
		let info = obj[module.exports.correctCase('info', snake_case)][module.exports.correctCase(category, snake_case)]

		let state = info[module.exports.correctCase('state', snake_case)],
			updated = info[module.exports.correctCase('updated', snake_case)]

		obj.status = {
			ok: state === 2 ? true : false,
			id: state,
			state: stateNames.get(state),
			updated: new Date(updated * 1000)
		}
		return obj
	},

	//XIVAPI expects numbers more than 10 digits long as strings. we account for that here
	sanitizeInt(i) {
		if(i < 10000000000)
			return i
		else
			return i.toString()
	},

	//resolve URLs
	cleanContent(entry) {
		let icon = module.exports.correctCase('icon', this.globalParams.snake_case),
			url = module.exports.correctCase('url', this.globalParams.snake_case)
		entry[icon] = this.endpoint + entry[icon]
		entry[url] = this.endpoint + entry[url]
		return entry
	},

	//get right name based on snake_case
	correctCase(string, snake_case) {
		if(snake_case)//snake case
			return string

		string = string.replace('_', ' ')
		return module.exports.firstCapital(string).replace(' ', '')//capital case
	},

	cleanColumns(x) {
		if(Array.isArray(x))
			return x.join(',')
		else if(typeof(x) === 'string')
			return x
	}
}
