let { req, reqJSON, cleanContent, correctCase, makeCSV } = require('../utils')

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
			reject(Error('input must be defined'))

		let path = params.lore ? '/lore' : '/search',
			currCase = typeof params.snake_case !== 'undefined' ? params.snake_case : this.globalParams.snake_case

		switch(typeof(input)) {
			// GET method
			case 'string':
				params.indexes = makeCSV(params.indexes)

				req(
					path,
					Object.assign(params, {string: input})
				).then((res) => {
					res[correctCase('results', currCase)].forEach((entry) => { //eslint-disable-line no-unused-vars
						entry = cleanContent(entry)
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
