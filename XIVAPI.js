const utils = require('./utils'),
	resources = require('./resources/'),

	Search 			= require('./lib/search'),
	Character 	= require('./lib/character'),
	FreeCompany	= require('./lib/freecompany'),
	Linkshell		= require('./lib/linkshell'),
	Content			= require('./lib/content')

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
			key: 				apikey,
			language: 	options.language || 'en',
			snake_case:	options.snake_case
		}
		if(!resources.languages.includes(this.globalParams.language))
			throw Error(`invalid language given, must be: ${this.resources.languages}`)

		this.resources = resources
		this.utils = utils

		this.search 			= Search.bind(this)
		this.character 		= new Character(this)
		this.freecompany	= new FreeCompany(this)
		this.linkshell 		= new Linkshell(this)
		this.content			= new Content(this)
	}
}

module.exports = XIVAPI
