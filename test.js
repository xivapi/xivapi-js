const XIVAPI = require('./XIVAPI')
const xiv = new XIVAPI()

xiv.freeCompany.get(`9233364398528114605`).then(callback => {
	console.log(callback)
}).catch(callback => {
	console.error(callback)
})
