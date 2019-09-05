// https://xivapi.com/docs/Linkshell
const Lib = require('./Lib')

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
				reject(this.throwError('linkshell.search()', 'a name'))

			this.req(
				'/linkshell/search',
				Object.assign(params, {name:name})
			).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}

	get(id) {
		return new Promise((resolve, reject) => {
			if(typeof(id) === 'undefined')
				reject(this.throwError('linkshell.get()', 'an ID'))

			this.req('/linkshell/' + id).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}
}

module.exports = Linkshell
