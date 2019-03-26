// https://xivapi.com/docs/Welcome#section-4
const Lib = require('./Lib')
let { firstCapital, cleanContent, correctCase } = require('../utils')

class Content extends Lib {
	constructor(parent) {
		super(parent)

		cleanContent = cleanContent.bind(parent)
	}

	prices(id, server, params = {}) {
		return new Promise((resolve, reject) => {
			if(typeof(id) === 'undefined')
				reject(Error('The ID must be defined for market prices.'))
			if(typeof(server) === 'undefined')
				reject(Error('The server must be defined for market prices.'))
			if(!this.parent.resources.servers.includes(firstCapital(server)))
				reject(Error('The server is not valid for market prices.'))

			this.req(
				`/market/${server}/items/${id}`,
				params
			).then((res) => {
				let item = correctCase('item', this.parent.globalParams.snake_case),
					prices = correctCase('prices', this.parent.globalParams.snake_case),
					town = correctCase('town', this.parent.globalParams.snake_case)

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
				reject(Error('The ID must be defined for market history.'))
			if(typeof(server) === 'undefined')
				reject(Error('The server must be defined for market history.'))
			if(!this.parent.resources.servers.includes(firstCapital(server)))
				reject(Error('The server is not valid for market history.'))


			this.req(
				`/market/${server}/items/${id}/history`,
				params
			).then((res) => {
				let item = correctCase('item', this.parent.globalParams.snake_case),
					history = correctCase('history', this.parent.globalParams.snake_case),
					purchase_date = correctCase('purchase_date', this.parent.globalParams.snake_case)

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
				reject(Error('The category must be defined for market stock.'))
			if(typeof(server) === 'undefined')
				reject(Error('The server must be defined for market stock.'))
			if(!this.parent.resources.servers.includes(firstCapital(server)))
				reject(Error('The server is not valid for market stock.'))

			this.req(
				`/market/${server}/category/${category}`,
				params
			).then((res) => {
				let item = correctCase('item', this.parent.globalParams.snake_case)
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
