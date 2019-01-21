// https://xivapi.com/docs/Welcome#section-4
const Lib = require('./Lib')
let { cleanContent, makeCSV } = require('../utils')

/*TODO: columns,
*/
class Content extends Lib {
	constructor(parent) {
		super(parent)

		cleanContent = cleanContent.bind(parent)
	}

	content() {
		return new Promise((resolve, reject) => {
			this.req('/content').then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}

	/*
	{
		limit
		ids
	}
	*/
	list(name, params = {}) {
		return new Promise((resolve, reject) => {
			if(typeof(name) === 'undefined')
				reject(Error('name must be defined'))

			params.ids = makeCSV(params.ids)

			this.req(
				`/${name}`,
				params
			).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}

	schema(name) {
		return new Promise((resolve, reject) => {
			if(typeof(name) === 'undefined')
				reject(Error('name must be defined'))

			this.req(`/${name}/schema`).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}

	get(name, id) {
		return new Promise((resolve, reject) => {
			if(typeof(name) === 'undefined')
				reject(Error('name must be defined'))
			if(typeof(id) === 'undefined')
				reject(Error('id must be defined'))

			this.req(`/${name}/${id}`).then((res) => {
				resolve(cleanContent(res))
			}).catch((err) => {
				reject(err)
			})
		})
	}


}

module.exports = Content
