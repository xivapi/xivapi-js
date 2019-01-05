const XIVAPI = require('./XIVAPI'),
	readline = require('readline')

const api = new XIVAPI('42f8ea65f4ee4aad97c2fc9f', {testing: true})

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
}).on('line', function (cmd) {
	console.log(eval(cmd))
})
