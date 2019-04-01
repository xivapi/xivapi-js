// https://xivapi.com/docs/Welcome#section-4
const Lib = require('./Lib')
let { cleanContent, getCurrCase, makeCSV } = require('../utils')

class Content extends Lib {
	constructor(parent) {
		super(parent)

		cleanContent = cleanContent.bind(parent)
	}

	get(ids, params = {}) {
		return new Promise((resolve, reject) => {
			if(typeof(ids) === 'undefined')
				reject(Error('The ids must be defined for market get.'))
			if(!params.servers && !params.dc)
				reject(Error('The servers or dc params must be defined for market get.'))

			let path = '/market/'
			//currCase = getCurrCase(this.parent.globalParams, params)

			if(!getSingle(ids)) {//multiple IDs
				path += 'items'
				params.ids = makeCSV(ids)
				params.servers = makeCSV(params.servers)

			} else if(params.dc || !getSingle(params.servers)) {//single ID, multiple servers
				path += `item/${getSingle(ids)}`
				params.servers = makeCSV(params.servers)

			} else {//single ID & server
				let server = getSingle(params.servers)
				path += `${server}/item/${getSingle(ids)}`

			}

			this.req(path, params).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}

	categories(params = {}) {
		return new Promise((resolve, reject) => {
			let currCase = getCurrCase(this.parent.globalParams, params)

			this.req(
				'/market/categories',
				params
			).then((res) => {
				res = cleanContent(res, currCase)

				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}


}

module.exports = Content

const getSingle = (x) => {
	if(typeof x === 'number' || (typeof x === 'string' && !x.includes(',')))
		return x
	if(x.length === 1)
		return x[0]
	return false
}
