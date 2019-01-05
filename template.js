// https://xivapi.com/docs/Welcome#section-4
const req = require('request-promise-native')

/*TODO: columns, tags,
*/
module.export = function() {
	req({
		uri: this.endpoint + '',
		qs: {
			key: 				this.apikey,
			language: 	this.options.lang,
			snake_case: this.options.snakecase ? 1 : 0,


		},
		json: true
	})
		.then((res) => {

		})
		.catch((err) => {

		})
}
