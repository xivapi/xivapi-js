const { req } = require('../utils')

class Lib {
	constructor(parent) {
		this.parent = parent

		this.req = req.bind(parent)
	}
}

module.exports = Lib
