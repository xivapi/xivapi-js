// https://xivapi.com/docs/Free-Company
const Lib = require('./Lib')

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
	async search(name, params={}) {
		if(typeof(name) === 'undefined')
			throw this.throwError('freecompany.search()','a name')
		return this.req('/freecompany/search', Object.assign(params, {name}))
	}

	/*
	{
		extended
		data
	}
	*/
	async get(id, params={}) {
		if(typeof(id) === 'undefined')
			throw this.throwError('freecompany.get()', 'an ID')

		params.data = this.makeCSV(params.data)

		return this.req(`/freecompany/${id}`, params)
	}
}

module.exports = FreeCompany
