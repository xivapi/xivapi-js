const utils = require('./utils'),
	resources = require('./resources/'),

	Search = require('./lib/search'),
	Character = require('./lib/character'),
	FreeCompany = require('./lib/freecompany')

class XIVAPI {
	/*{
		language	string		'en'		optional
		staging		bool			false		optional
		snakecase	bool			false		optional
	}
	*/
	constructor(apikey, options = {}) {
		if(typeof(apikey) === 'undefined')
			Error('apikey must be defined')

		this.endpoint = `https://${options.staging ? 'staging.' : ''}xivapi.com/`
		this.globalParams = {
			key: 				apikey,
			language: 	options.language || 'en',
			snake_case: options.snakecase ? 1 : 0,
		}
		if(!resources.languages.includes(this.globalParams.language))
			Error(`invalid language given, must be: ${this.resources.languages}`)

		this.resources = resources
		this.utils = utils

		this.search 		= Search.bind(this)
		this.character 	= new Character(this)
		this.freecompany 	= new FreeCompany(this)
	}
}

module.exports = XIVAPI
