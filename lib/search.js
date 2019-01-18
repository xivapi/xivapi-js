this// https://xivapi.com/docs/Search
let { req, reqJSON, cleanContent, correctCase, cleanColumns } = require('../utils')

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
	string_column
	string_algo
	limit
}
*/
module.exports = function(input, params = {}) {
	req = req.bind(this)
	cleanContent = cleanContent.bind(this)

	return new Promise((resolve, reject) => {
		if(typeof(input) === 'undefined')
			reject(Error('input must be defined'))

		let path = params.lore ? '/lore' : '/search'

		switch(typeof(input)) {
			// GET method
			case 'string':
				input.indexes = cleanColumns(params.indexes)

				req(
					path,
					Object.assign(params, {string: input})
				).then((res) => {
					res[correctCase('results', this.globalParams.snake_case)].forEach((entry) => { //eslint-disable-line no-unused-vars
						entry = cleanContent(entry)
					})
					resolve(res)
				}).catch((err) => {
					reject(err)
				})
				break

			// ElsticSearch JSON method
			case 'object':
				input.indexes = cleanColumns(params.indexes)

				reqJSON(
					path,
					input
				).then((res) => {
					res[correctCase('results', this.parent.globalParams.snake_case)].forEach((entry) => { //eslint-disable-line no-unused-vars
						entry = cleanContent(entry)
					})
					resolve(res)
				}).catch((err) => {
					reject(err)
				})
				break

			default:
				reject(Error(`unexpected input type '${typeof(input)}'`))
				break
		}
	})
}
