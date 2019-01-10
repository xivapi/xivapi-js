// https://xivapi.com/docs/Free-Company
const Lib = require('./Lib'),
	{ makeStatus, sanitizeInt } = require('../utils')

class FreeCompany extends Lib {
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
				'/freecompany/search',
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

	/*
	{
		extended
		data
	}
	*/
	get(id, params = {}) {
		return new Promise((resolve, reject) => {
			if(typeof(id) === 'undefined')
				reject(Error('id must be defined'))
			id = sanitizeInt(id)

			this.req(
				'/freecompany/' + id,
				params
			).then((res) => {
				res = makeStatus(res, 'FreeCompany')
				if(res.status.ok)
					res.FreeCompany.ID = parseInt(res.FreeCompany.ID)
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}
}

module.exports = FreeCompany
