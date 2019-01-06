const request = require('request-promise-native')

class Lib {
	constructor(parent) {
		this.parent = parent
	}

	req(path, params) {
		return request({
			uri: this.parent.endpoint + path,
			qs: Object.assign(this.parent.globalQueries, params),
			json: true
		})
	}
}

module.exports = Lib
