const Benchmark = require('benchmark')
let suite = new Benchmark.Suite

suite.add('multiply int', () => {
	let time = new Date(1547054962 * 1000)
})

suite.add('add to string', () => {
	let time = new Date(parseInt(`${1547054962}000`))
})

suite.on('cycle', function(event) {console.log(String(event.target)) })
suite.on('complete', function() {console.log('Fastest is ' + this.filter('fastest').map('name'))})
suite.run({ 'async': true })
