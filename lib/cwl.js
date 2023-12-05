// https://xivapi.com/docs/Linkshell
const Lib = require('./Lib')

class CWL extends Lib {
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
			throw this.throwError('cwl.search()','a name')
		return this.req('/linkshell/crossworld/search', Object.assign(params, {name}))
	}

	async get(id) {
		if(typeof(id) === 'undefined')
			throw this.throwError('cwl.get()', 'an ID')
		return this.req(`/linkshell/crossworld/${id}`)
	}
}

module.exports = CWL
