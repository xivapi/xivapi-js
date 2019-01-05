// https://xivapi.com/docs/Character
const request = require('request-promise-native')

class Character {
	constructor() {}

	/*
	{
		server	string	optional
		page		int			optional
	}
	*/
	search(name, params = {}) {
		console.log(this)
		return
		request({
			uri: this.endpoint + 'character/search',
			qs: Object.assign(this.globalQueries, params, {name: name}),
			json: true
		})
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
	}
}

module.exports = Character
