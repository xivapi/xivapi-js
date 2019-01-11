// https://xivapi.com/docs/Welcome#section-4
const Lib = require('./Lib')
let { cleanContent } = require('../utils')

/*TODO: columns,
*/
class Content extends Lib {
	constructor(parent) {
		super(parent)

		cleanContent = cleanContent.bind(parent)
	}

	/*
	{

	}
	*/
}

module.exports = Content
