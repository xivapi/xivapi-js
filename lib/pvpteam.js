const Lib = require('./Lib')
let { makeStatus, sanitizeInt } = require('../utils')

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
				reject(Error('The name for PvPTeam must be defined.'))

			this.req(
				'/pvpteam/search',
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
				reject(Error('The id for PvPTeam must be defined.'))
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
