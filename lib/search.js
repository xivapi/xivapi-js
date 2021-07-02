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
module.exports = async function(input, params = {}) {
	req = req.bind(this);
	reqJSON = reqJSON.bind(this);

	if(typeof(input) === 'undefined')
		throw throwError('search()', 'any input')

	let path = params.lore ? '/lore' : '/search'

	switch(typeof(input)) {
		// GET method
		case 'string':
			params.indexes = makeCSV(params.indexes);
			return req(path, Object.assign(params, {"string": input}));

		// ElasticSearch JSON method
		case 'object':
			input.indexes = makeCSV(params.indexes);
			return reqJSON(path, input);

		default:
			throw new Error(`Unexpected input type for search: '${typeof(input)}'`);
	}
}
