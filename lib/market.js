// https://xivapi.com/docs/Welcome#section-4
const Lib = require('./Lib')
let { firstCapital, cleanContent, correctCase, getCurrCase } = require('../utils')

class Content extends Lib {
	constructor(parent) {
		super(parent)

		cleanContent = cleanContent.bind(parent)
	}

	prices(id, server, params = {}) {
		return new Promise((resolve, reject) => {
			if(typeof(id) === 'undefined')
				reject(Error('id must be defined'))
			if(typeof(server) === 'undefined')
				reject(Error('server must be defined'))
			if(!this.parent.resources.servers.includes(firstCapital(server)))
				reject(Error('server not valid'))

			let currCase = getCurrCase(this.parent.globalParams, params)

			this.req(
				`/market/${server}/items/${id}`,
				params
			).then((res) => {
				let item = correctCase('item', currCase),
					prices = correctCase('prices', currCase),
					town = correctCase('town', currCase)

				res[item] = cleanContent(res[item])
				for (let i = 0; i < res[prices].length; i++) {
					res[prices][i][town] = cleanContent(res[prices][i][town])
				}

				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}

	history(id, server, params = {}) {
		return new Promise((resolve, reject) => {
			if(typeof(id) === 'undefined')
				reject(Error('id must be defined'))
			if(typeof(server) === 'undefined')
				reject(Error('server must be defined'))
			if(!this.parent.resources.servers.includes(firstCapital(server)))
				reject(Error('server not valid'))

			let currCase = getCurrCase(this.parent.globalParams, params)

			this.req(
				`/market/${server}/items/${id}/history`,
				params
			).then((res) => {
				let item = correctCase('item', currCase),
					history = correctCase('history', currCase),
					purchase_date = correctCase('purchase_date', currCase)

				res[item] = cleanContent(res[item])
				for (let i = 0; i < res[history].length; i++) {
					res[history][i][purchase_date] = new Date(res[history][i][purchase_date] * 1000)
				}

				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}

	stock(category, server, params = {}) {
		return new Promise((resolve, reject) => {
			if(typeof(category) === 'undefined')
				reject(Error('category must be defined'))
			if(typeof(server) === 'undefined')
				reject(Error('server must be defined'))
			if(!this.parent.resources.servers.includes(firstCapital(server)))
				reject(Error('server not valid'))

			let currCase = getCurrCase(this.parent.globalParams, params)

			this.req(
				`/market/${server}/category/${category}`,
				params
			).then((res) => {
				let item = correctCase('item', currCase)
				for (let i = 0; i < res.length; i++) {
					res[i][item] = cleanContent(res[i][item])
				}

				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}

	categories(params = {}) {
		return new Promise((resolve, reject) => {
			this.req(
				'/market/categories',
				params
			).then((res) => {
				res = cleanContent(res)

				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}


}

module.exports = Content
