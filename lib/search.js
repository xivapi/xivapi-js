// https://xivapi.com/docs/Search
const req = require('request-promise-native')

/*
{
TODO:
	indexes: [],  add list https://xivapi.com/docs/Search#indexes
	string_column
	all minor

DONE:
	string_algo: 'wildcard'
}
*/
module.exports = function(string, params = {}) {
	req({
		uri: this.endpoint + 'search',
		qs: Object.assign(this.globalQueries, params, {string: string}),
		json: true
	}).then((res) => {
		console.log(res)

	}).catch((err) => {
		console.log(err)

	})
}
