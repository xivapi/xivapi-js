// https://xivapi.com/docs/Welcome#section-4
const Lib = require('./Lib')
let { cleanContent, makeCSV } = require('../utils')

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
				reject(Error('The name must be defined for Content list.'))

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
				reject(Error('The name must be defined for Content schema.'))

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
				reject(Error('The name must be defined for get() in Content.'))
			if(typeof(id) === 'undefined')
				reject(Error('The id must be defined for get() in Content.'))

			this.req(`/${name}/${id}`).then((res) => {
				resolve(cleanContent(res, this.parent.globalParams.snake_case))
			}).catch((err) => {
				reject(err)
			})
		})
	}


}

module.exports = Content
