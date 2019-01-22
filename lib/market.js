// https://xivapi.com/docs/Welcome#section-4
const Lib = require('./Lib')
let { cleanContent, correctCase } = require('../utils')

/*TODO: columns,
*/
class Content extends Lib {
	constructor(parent) {
		super(parent)

		cleanContent = cleanContent.bind(parent)
	}

	item(id, server) {
		return new Promise((resolve, reject) => {
			if(typeof(id) === 'undefined')
				reject(Error('id must be defined'))
			if(typeof(server) === 'undefined')
				reject(Error('server must be defined'))
			if(!this.parent.resources.servers.includes(this.parent.utils.firstCapital(server)))
				reject(Error('server not valid'))

			this.req(`/market/${server}/items/${id}`).then((res) => {
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
				reject(Error('id must be defined'))
			if(typeof(server) === 'undefined')
				reject(Error('server must be defined'))
			if(!this.parent.resources.servers.includes(this.parent.utils.firstCapital(server)))
				reject(Error('server not valid'))


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

	stock(category, server) {
		return new Promise((resolve, reject) => {
			if(typeof(category) === 'undefined')
				reject(Error('category must be defined'))
			if(typeof(server) === 'undefined')
				reject(Error('server must be defined'))
			if(!this.parent.resources.servers.includes(this.parent.utils.firstCapital(server)))
				reject(Error('server not valid'))

			this.req(`/market/${server}/category/${category}`).then((res) => {
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

	categories() {
		return new Promise((resolve, reject) => {
			this.req('/market/categories').then((res) => {
				res = cleanContent(res)

				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}


}

module.exports = Content
