const resources = require('./resources/'),
	Search = require('./lib/search'),
	Data = require('./lib/data'),
	Character = require('./lib/character'),
	FreeCompany = require('./lib/freecompany'),
	Linkshell = require('./lib/linkshell'),
	PvPTeam = require('./lib/pvpteam')

class XIVAPI {
	/*{
		private_key	string	undefined	optional
		language		string	'en'			optional
		snake_case	bool		false			optional
		staging			bool		false			optional
		verbose			bool		false			optional
	}
	*/
	constructor(options = {}, legacyOptions = {}) {
		//handle attempted use of old API key
		if(typeof(options) === 'string') {
			console.error('[xivapi-js] BREAKING CHANGE:\n\
The previous API keys for XIVAPI have been phased out, and are no longer mandatory. \
This means you\'ll have to define your key during initialization slightly differently. \
See how in https://github.com/xivapi/xivapi-js/releases/tag/v0.1.3.\n\
**This instance of xivapi-js will run WITHOUT an API key**')
			options = legacyOptions
		}

		this.endpoint = `https://${options.staging ? 'staging.' : ''}xivapi.com`
		if(options.language && !resources.languages.includes(options.language))
			throw Error(`Invalid language given, must be one of: ${this.resources.languages}`)

		this.globalParams = {}

		for (let x of ['private_key', 'language']) {
			if(typeof options[x] !== 'undefined')
				this.globalParams[x] = options[x]
		}
		if(options.snake_case)
			this.globalParams.snake_case = 1

		this.verbose = options.verbose

		this.resources = resources
		this.utils = require('./utils')

		this.search = Search.bind(this)
		this.data = new Data(this)
		this.character = new Character(this)
		this.freecompany = new FreeCompany(this)
		this.linkshell = new Linkshell(this)
		this.pvpteam = new PvPTeam(this)
	}
}

module.exports = XIVAPI
