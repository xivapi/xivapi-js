const Benchmark = require('benchmark')
let suite = new Benchmark.Suite

suite.add('concat', () => {
	let x = 'content'
	let y = '/' + x
})

suite.add('jquery', () => {
	let x = 'content'
	let y = `/${x}`
})

suite.on('cycle', function(event) {console.log(String(event.target)) })
suite.on('complete', function() {console.log('Fastest is ' + this.filter('fastest').map('name'))})
suite.run({ 'async': true })
