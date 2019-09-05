const request = require('request-promise-native')

module.exports = {
	//standard request function
	req(path, params) {
		if(params && typeof params.snake_case !== 'undefined')
			params.snake_case = params.snake_case ? 1 : 0

		params = Object.assign({}, this.globalParams, params)

		if(this.verbose)
			console.log(`Requesting ${path} with params: `, params)

		return request({
			uri: this.endpoint + path,
			qs: params,
			json: true
		})
	},

	//JSON request function
	reqJSON(path, body) {
		if(this.verbose)
			console.log(`Requesting ${path} with body: `, body)

		return request({
			method: 'POST',
			uri: this.endpoint + path,
			body: body,
			json: true
		})
	},

	//handle both comma-separated strings, and string arrays, for CSV params
	makeCSV(x) {
		if(typeof(x) === 'undefined')
			return

		if(Array.isArray(x))
			return x.join(',')
		if(typeof(x) === 'string')
			return x
	},

	throwError(method, param) {
		return Error(`xivapi-js: Can't use ${method} without providing ${param}.`)
	}
}
