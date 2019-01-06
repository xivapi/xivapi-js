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
	search(name, params = {}) {
		if(typeof(name) === 'undefined')
			return Error('name must be defined')
		if(params.server && !this.parent.resources.servers.includes(this.parent.utils.firstCapital(params.server)))
			return Error('server not valid')

		this.req(
			'freecompany/search',
			Object.assign(params, {name:name})
		).then((res) => {
			console.log(res)
		}).catch((err) => {
			console.log(err)
		})
	}

	/*
	{
		extended
		data
	}
	*/
	get(id, params = {}) {
		if(typeof(id) === 'undefined')
			Error('id must be defined')

		this.req(
			'freecompany/' + id,
			params
		).then((res) => {
			console.log(res)
		}).catch((err) => {
			console.log(err)
		})
	}
}

module.exports = FreeCompany
