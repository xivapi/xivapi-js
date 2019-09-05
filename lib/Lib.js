const utils = require('../utils')

class Lib {
	constructor(parent) {
		this.parent = parent

		this.req = utils.req.bind(parent)
		this.reqJSON = utils.reqJSON.bind(parent)
		this.makeCSV = utils.makeCSV
		this.throwError = utils.throwError
	}
}

module.exports = Lib
