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
	search(name, params = {}) {
		return new Promise((resolve, reject) => {
			if(!name)
				reject(this.throwError('character.search()', 'a name'))

			this.req(
				'/character/search',
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
			if(!id)
				reject(this.throwError('character.get()', 'an ID'))

			params.extended = params.extended ? 1 : 0

			this.req(
				'/character/' + id,
				params
			).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}

}

module.exports = Character
