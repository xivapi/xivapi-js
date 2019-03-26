const Lib = require('./Lib')
let { firstCapital, makeStatus, sanitizeInt, correctCase, getCurrCase } = require('../utils')

class PvPTeam extends Lib {
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

			if(params.server && !this.parent.resources.servers.includes(firstCapital(params.server)))
				reject(Error('server not valid'))

			let currCase = getCurrCase(this.parent.globalParams, params)

			this.req(
				'/pvpteam/search',
				Object.assign(params, {name:name})
			).then((res) => {
				let results = correctCase('results', currCase)
				if(res[results].length) { //parse long ints
					let id = correctCase('id', currCase)
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

			this.req('/pvpteam/' + id).then((res) => {
				res = makeStatus(res, 'pvp_team') //or linkshell?
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}
}

module.exports = PvPTeam
