// https://xivapi.com/docs/Linkshell
const Lib = require('./Lib')
let { makeStatus, sanitizeInt, correctCase } = require('../utils')

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
				reject(Error('name must be defined'))
			
			if(params.server && !this.parent.resources.servers.includes(this.parent.utils.firstCapital(params.server)))
				reject(Error('server not valid'))

			this.req(
				'/linkshell/search',
				Object.assign(params, {name:name})
			).then((res) => {
				let results = correctCase('results', this.parent.globalParams.snake_case)
				if(res[results].length) { //parse long ints
					let id = correctCase('id', this.parent.globalParams.snake_case)
					res[results].forEach((entry) => {
						entry[id] = parseInt(entry[id])
					})
				}
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}

	get(id) {
		return new Promise((resolve, reject) => {
			if(typeof(id) === 'undefined')
				reject(Error('id must be defined'))
			id = sanitizeInt(id)

			this.req('/linkshell/' + id).then((res) => {
				res = makeStatus(res, 'linkshell')
				if(res.status.ok) {
					let ls = correctCase('linkshell', this.parent.globalParams.snake_case),
						id = correctCase('id', this.parent.globalParams.snake_case)
					res[ls][id] = parseInt(res[ls][id])
				}
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}
}

module.exports = Linkshell
