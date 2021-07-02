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
	async search(name, params={}) {
		if(typeof(name) === 'undefined')
			throw this.throwError('LinkShell.search()','a name');
		return this.req(`/linkshell/search`, Object.assign({}, params, {name}));
	}

	async get(id) {
		if(typeof(id) === 'undefined') 
			throw this.throwError('LinkShell.get()', 'an ID');
		return this.req(`/linkshell/${id}`);
	}
}

module.exports = Linkshell
