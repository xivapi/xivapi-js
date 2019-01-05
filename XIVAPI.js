const
	Search = require('./lib/search'),
	Character = require('./lib/character')

class XIVAPI {
	/*{
		lang			string		'en'		optional
		staging		bool			false		optional
		testing		bool			false		optional
		snakecase	bool			false		optional
	}
	*/
	constructor(apikey, options = {}) {
		if(typeof(apikey) === 'undefined')
			Error('apikey must be defined')

		this.endpoint = `https://${options.staging ? 'staging.' : ''}xivapi.com/`
		this.globalQueries = {
			key: 				apikey,
			language: 	options.lang || 'en',
			pretty:			options.testing ? 1 : 0,
			snake_case: options.snakecase ? 1 : 0,
		}

		this.search 		= Search
		this.character 	= new Character(this)

		console.log(this)
	}
}

module.exports = XIVAPI
