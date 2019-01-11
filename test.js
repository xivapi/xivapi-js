const XIVAPI = require('./XIVAPI'),
	readline = require('readline')

const xiv = new XIVAPI('42f8ea65f4ee4aad97c2fc9f', {snake_case: true})

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: false
}).on('line', function (cmd) {
	console.log(eval(cmd))
})
