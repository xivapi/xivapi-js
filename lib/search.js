// https://xivapi.com/docs/Search
let { req, cleanContent, correctCase } = require('../utils')

/*
{
filters
lore

POST json

TODO:
	indexes: [],  add list https://xivapi.com/docs/Search#indexes
	string_column
	all minor

DONE:
	string_algo: 'wildcard'
}
*/
module.exports = function(string, params = {}) {
	req = req.bind(this)
	cleanContent = cleanContent.bind(this)

	return new Promise((resolve, reject) => {
		if(typeof(string) === 'undefined')
			reject(Error('string must be defined'))

		req(
			'/search',
			Object.assign(params, {string: string})
		).then((res) => {
			res[correctCase('results', this.parent.globalParams.snake_case)].forEach((entry) => { //eslint-disable-line no-unused-vars
				entry = cleanContent(entry)
			})
			resolve(res)
		}).catch((err) => {
			reject(err)
		})
	})
}
