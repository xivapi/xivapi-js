// https://xivapi.com/docs/Character
const Lib = require('./Lib'),
	{ makeStatus } = require('../utils')

class Character extends Lib {
	constructor(parent) {
		super(parent)
	}

	/*
	{
		server	string	optional
		page		int			optional
	}
	*/
	search(name, params = {}) {
		return new Promise((resolve, reject) => {
			if(typeof(name) === 'undefined')
				reject(Error('name must be defined'))
			if(params.server && !this.parent.resources.servers.includes(this.parent.utils.firstCapital(params.server)))
				return(Error('server not valid'))

			this.req(
				'character/search',
				Object.assign(params, {name:name})
			).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}

	/*
	{
		extended
		data
	}
	*/
	get(id, params = {}) {
		return new Promise((resolve, reject) => {
			if(typeof(id) === 'undefined')
				reject(Error('id must be defined'))

			this.req(
				'character/' + id,
				params
			).then((res) => {
				res = makeStatus(res, 'Character')
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	}

	/*
	token	optional
	*/
	verification(id, token) {
		return new Promise((resolve, reject) => {
			if(typeof(id) === 'undefined')
				reject(Error('id must be defined'))

			this.req(
				`character/${id}/verification`,
				{token: token}
			).then((res) => {
				if(token)
					resolve(res.Pass)
				else
					resolve(res.Bio)
			}).catch((err) => {
				reject(err)
			})
		})
	}

	update(id) {
		return new Promise((resolve, reject) => {
			if(typeof(id) === 'undefined')
				reject(Error('id must be defined'))

			this.req(`character/${id}update`).then((res) => {
				resolve(res === 1)
			}).catch((err) => {
				reject(err)
			})
		})
	}

}

module.exports = Character
