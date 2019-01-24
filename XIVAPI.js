const utils = require('./utils'),
	resources = require('./resources/'),

	Search = require('./lib/search'),
	Data = require('./lib/data'),
	Character = require('./lib/character'),
	FreeCompany = require('./lib/freecompany'),
	Linkshell = require('./lib/linkshell'),
	PvPTeam = require('./lib/pvpteam'),
	Lodestone = require('./lib/lodestone'),
	Market = require('./lib/market')

class XIVAPI {
	/*{
		language		string	'en'		optional
		staging			bool		false		optional
		snake_case	bool		false		optional
	}
	*/
	constructor(apikey, options = {}) {
		if(typeof(apikey) === 'undefined')
			throw Error('apikey must be defined')

		this.endpoint = `https://${options.staging ? 'staging.' : ''}xivapi.com`
		this.globalParams = {
			key: apikey,
			language: options.language || 'en',
			snake_case:	options.snake_case
		}
		if(!resources.languages.includes(this.globalParams.language))
			throw Error(`invalid language given, must be: ${this.resources.languages}`)

		this.resources = resources
		this.utils = utils

		this.search = Search.bind(this)
		this.data = new Data(this)
		this.character = new Character(this)
		this.freecompany = new FreeCompany(this)
		this.linkshell = new Linkshell(this)
		this.pvpteam = new PvPTeam(this)
		this.lodestone = Lodestone.bind(this)
		this.market = new Market(this)
	}
}

module.exports = XIVAPI
