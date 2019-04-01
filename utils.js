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

	//transform URLs properly
	cleanContent(input, snake_case, deep) {
		let icon = module.exports.correctCase('icon', snake_case),
			url = module.exports.correctCase('url', snake_case)

		const properties = [icon, url]

		const clean = (entry) => {
			entry[icon] = this.endpoint + entry[icon]
			entry[url] = this.endpoint + entry[url]
			return entry
		}

		const deepClean = (obj) => {
			Object.keys(obj).some((k) => {
				if (properties.includes(k)) {
					obj[k] = this.endpoint + obj[k]
				}
				if (obj[k] && typeof(obj[k]) === 'object') {
					deepClean(obj[k])
				}
			})
		}

		if(!deep) {
			if(Array.isArray(input))
				for (let i = 0; i < input.length; i++)
					input[i] = clean(input[i])
			else
				input = clean(input)
		} else {
			input = deepClean(input)
		}

		return input
	},

	//get right name based on snake_case
	correctCase(string, snake_case) {
		if(snake_case)//snake case
			return string

		//special exceptions
		switch (string) {
			case 'pvp_team':
				return 'PvPTeam'
			case 'id':
				return 'ID'
		}

		//make capital case
		string = string.replace('_', ' ')
		return module.exports.firstCapital(string).replace(' ', '')//capital case
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

	//get snake_case for method based on params and globalParams
	getCurrCase(globalParams, params) {
		return (typeof params.snake_case !== 'undefined') ? params.snake_case : globalParams.snake_case
	}
}
