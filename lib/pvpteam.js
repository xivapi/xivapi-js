// https://xivapi.com/docs/PVP-Team
const Lib = require('./Lib')

class PvPTeam extends Lib {
	constructor(parent) {
		super(parent)
	}

	/*
	{
		server	string	optional
		page		int			optional
	}
	*/
	async search(name, params={}) {
		if(typeof name==='undefined')
			throw this.throwError('pvpteam.search()', 'a name')

		return this.req('/pvpteam/search',Object.assign(params, {name}))
	}

	async get(id) {
		if(typeof id==='undefined')
			throw this.throwError('pvpteam.get()', 'an ID')

		return this.req(`/pvpteam/${id}`)
	}
}

module.exports = PvPTeam
