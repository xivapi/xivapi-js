// https://xivapi.com/docs/Welcome#section-4
const Lib = require('./Lib'),
	{ cleanContent } = require('../utils')

/*TODO: columns,
*/
class Content extends Lib {
	constructor(parent) {
		super(parent)

		this.cleanContent = cleanContent.bind(parent)
	}

	/*
	{

	}
	*/
}

module.exports = Content
