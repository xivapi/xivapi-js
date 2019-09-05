let { req, reqJSON, makeCSV, throwError } = require('../utils')

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

	return new Promise((resolve, reject) => {
		if(typeof(input) === 'undefined')
			reject(throwError('search()', 'any input'))

		let path = params.lore ? '/lore' : '/search'

		switch(typeof(input)) {
			// GET method
			case 'string':
				params.indexes = makeCSV(params.indexes)

				req(
					path,
					Object.assign(params, {string: input})
				).then((res) => {
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
