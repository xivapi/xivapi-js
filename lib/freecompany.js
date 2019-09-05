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
		return new Promise((resolve, reject) => {
			if(typeof(name) === 'undefined')
				reject(this.throwError('freecompany.search()', 'a name'))

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
				reject(this.throwError('freecompany.get()', 'an ID'))

			params.data = this.makeCSV(params.data)

			this.req(
				'/freecompany/' + id,
				params
			).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}
}

module.exports = FreeCompany
