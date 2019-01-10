// https://xivapi.com/docs/Linkshell
const Lib = require('./Lib'),
	{ makeStatus, sanitizeInt } = require('../utils')

class Linkshell extends Lib {
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
				reject(Error('name must be defined'))
			if(params.server && !this.parent.resources.servers.includes(this.parent.utils.firstCapital(params.server)))
				reject(Error('server not valid'))

			this.req(
				'/linkshell/search',
				Object.assign(params, {name:name})
			).then((res) => {
				if(res.Results.length) //parse long ints
					res.Results.forEach((entry) => {
						entry.ID = parseInt(entry.ID)
					})

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
				res = makeStatus(res, 'Linkshell')
				if(res.status.ok)
					res.Linkshell.ID = parseInt(res.Linkshell.ID)
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}
}

module.exports = Linkshell
