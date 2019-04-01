let { req, reqJSON, cleanContent, correctCase, makeCSV, getCurrCase } = require('../utils')

/*
{
	filters
	lore

	string_column
	string_algo
	limit
}
*/
module.exports = function(input, params = {}) {
	req = req.bind(this)
	reqJSON = reqJSON.bind(this)
	cleanContent = cleanContent.bind(this)

	return new Promise((resolve, reject) => {
		if(typeof(input) === 'undefined')
			reject(Error('The input must be defined for searching.'))

		let path = params.lore ? '/lore' : '/search',
			currCase = getCurrCase(this.globalParams, params)

		switch(typeof(input)) {
			// GET method
			case 'string':
				params.indexes = makeCSV(params.indexes)

				req(
					path,
					Object.assign(params, {string: input})
				).then((res) => {
					res[correctCase('results', currCase)].forEach((entry) => { //eslint-disable-line no-unused-vars
						entry = cleanContent(entry, currCase)
					})
					resolve(res)
				}).catch((err) => {
					reject(err)
				})
				break

			// ElasticSearch JSON method
			case 'object':
				input.indexes = makeCSV(params.indexes)

				reqJSON(
					path,
					input
				).then((res) => {
					res[correctCase('results', currCase)].forEach((entry) => { //eslint-disable-line no-unused-vars
						entry = cleanContent(entry, currCase)
					})
					resolve(res)
				}).catch((err) => {
					reject(err)
				})
				break

			default:
				reject(Error(`Unexpected input type for search: '${typeof(input)}'`))
				break
		}
	})
}
