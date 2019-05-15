// https://xivapi.com/docs/Linkshell
const Lib = require('./Lib')
let { makeStatus, sanitizeInt } = require('../utils')

class Linkshell extends Lib {
	constructor(parent) {
		super(parent)
		makeStatus = makeStatus.bind(parent)
	}

	/*
	{
		server	string	optional
		page		int			optional
	}
	*/
	search(name, params = {}) {
		return new Promise((resolve, reject) => {
			if(typeof(name) === 'undefined')
				reject(Error('The name must be defined for Linkshell search.'))

			this.req(
				'/linkshell/search',
				Object.assign(params, {name:name})
			).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}

	get(id) {
		return new Promise((resolve, reject) => {
			if(typeof(id) === 'undefined')
				reject(Error('The id must be defined for get() in Linkshell.'))
			id = sanitizeInt(id)

			this.req('/linkshell/' + id).then((res) => {
				res = makeStatus(res, 'linkshell')
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}
}

module.exports = Linkshell
