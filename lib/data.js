// https://xivapi.com/docs/Welcome#section-4
const Lib = require('./Lib')

class Content extends Lib {
	constructor(parent) {
		super(parent)
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
				reject(this.throwError('content.list()', 'a name'))

			params.ids = this.parent.utils.makeCSV(params.ids)

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

	get(name, id) {
		return new Promise((resolve, reject) => {
			if(typeof(name) === 'undefined')
				reject(this.throwError('content.get()', 'a name'))
			if(typeof(id) === 'undefined')
				reject(this.throwError('content.get()', 'an ID'))

			this.req(`/${name}/${id}`).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}

	servers() {
		return new Promise((resolve, reject) => {
			this.req('/servers').then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}

	datacenters() {
		return new Promise((resolve, reject) => {
			this.req('/servers/dc').then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}


}

module.exports = Content
