// https://xivapi.com/docs/Search
const req = require('request-promise-native')

/*
{
TODO:
	indexes: [],  add list https://xivapi.com/docs/Search#indexes
	string_column
	all minor

DONE:
	string_algo: 'custom'
}
*/
module.exports = function(string, params) {
	req({
		uri: this.endpoint + 'search',
		qs: {
			key: 				this.apikey,
			language: 	this.options.lang,
			snake_case: this.options.snakecase ? 1 : 0,

			string: string,
			string_algo: params.string_algo || 'wildcard',

		},
		json: true
	})
		.then((res) => {

		})
		.catch((err) => {

		})
}
