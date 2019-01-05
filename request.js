const request = require('request-promise-native')


module.exports = function(path, queries) {
	return request({
		uri: this.endpoint + path,
		qs: Object.assign(globalQueries, queries),
		json: true
	})
}
