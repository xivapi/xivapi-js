// https://xivapi.com/docs/Free-Company
const Lib = require('./Lib')
let { firstCapital, makeStatus, sanitizeInt, makeCSV } = require('../utils')

class FreeCompany extends Lib {
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
				reject(Error('The name must be defined for FreeCompany search.'))
			if(params.server && !this.parent.resources.servers.includes(firstCapital(params.server)))
				reject(Error('The server is not valid for FreeCompany search.'))

			this.req(
				'/freecompany/search',
				Object.assign(params, {name:name})
			).then((res) => {
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
				reject(Error('The id must be defined for get() in FreeCompany.'))

			id = sanitizeInt(id)
			params.data = makeCSV(params.data)

			this.req(
				'/freecompany/' + id,
				params
			).then((res) => {
				res = makeStatus(res, 'free_company')
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}
}

module.exports = FreeCompany
