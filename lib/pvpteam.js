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
	search(name, params = {}) {
		return new Promise((resolve, reject) => {
			if(typeof(name) === 'undefined')
				reject(this.throwError('pvpteam.search()', 'a name'))

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
				reject(this.throwError('pvpteam.get()', 'an ID'))

			this.req('/pvpteam/' + id).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}
}

module.exports = PvPTeam
