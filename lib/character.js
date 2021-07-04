// https://xivapi.com/docs/Character
const Lib = require('./Lib')

class Character extends Lib {
	constructor(parent) {
		super(parent)
	}

	/*
	{
		server
		page
	}
	*/
	async search(name, params={}) {
		if(!name)
			throw this.throwError('character.search()', 'a name')
		return this.req('/character/search', Object.assign(params, {name}))
	}

	/*
	{
		extended
		data
	}
	*/
	async get(id, params={}) {
		if(!id)
			throw this.throwError('character.get()','an ID')

		return this.req(`/character/${id}`, params)
	}
}

module.exports = Character
