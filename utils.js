const request = require('@root/request')

module.exports = {
	//standard request function
	async req(path, params={}) {
		let convs = ['snake_case', 'extended']
		for (const c of convs) {
			if(typeof params[c] !== 'undefined')
				params[c] = params[c] ? 1 : 0
		}


		params = Object.assign({}, this.globalParams, params)

		if(this.verbose)
			console.log(`Requesting ${path} with params: `, params)

		return (await request({
			url: `${this.endpoint + path}${Object.keys(params).length > 0 ? `?${new URLSearchParams(params).toString()}` : ''}`,
			json: true
		})).body
	},

	//JSON request function
	async reqJSON(path, body) {
		if(this.verbose)
			console.log(`Requesting ${path} with body: `, body)

		return (await request({
			method: 'POST',
			url: this.endpoint + path,
			body: body,
			json: true
		})).body
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
