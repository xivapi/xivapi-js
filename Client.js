const	Search = require('./lib/search')

class Client {
	/*{
		staging		bool			false		optional
		lang			string		'en'		optional
		testing		bool			false		optional
	}
	*/
	constructor(apikey, options = {}) {
		if(typeof(apikey) === 'undefined')
			Error('apikey must be defined')

		this.apikey = apikey
		this.endpoint = `https://${options.staging ? 'staging.' : ''}xivapi.com/`
		this.options = {
			lang: 			options.lang || 'en',
			testing: 		options.testing || false
		}

		this.search = new Search()
	}
}

module.export = Client
