// https://xivapi.com/docs/Welcome#section-4
const Lib = require('./Lib')

class Content extends Lib {
	constructor(parent) {
		super(parent)
	}

	async content() {
		return this.req('/content')
	}

	/*
	{
		limit
		ids
	}
	*/
	async list(name, params={}) {
		if(typeof name==='undefined')
			throw this.throwError('data.list()','a name')

		if(params.ids)
			params.ids = this.parent.utils.makeCSV(params.ids)

		return this.req(`/${name}`, params)
	}

	async get(name, id) {
		const missing_params = []
		if(typeof name==='undefined')
			missing_params.push('a name')
		if(typeof id==='undefined')
			missing_params.push('an ID')
		if(missing_params.length>0)
			throw this.throwError('data.get()', missing_params.join(','))

		return this.req(`/${name}/${id}`)
	}

	servers() {
		return this.req('/servers')
	}

	datacenters() {
		return this.req('/servers/dc')
	}


}

module.exports = Content
