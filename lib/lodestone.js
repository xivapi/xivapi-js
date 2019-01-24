let { req, correctCase } = require('../utils')

module.exports = function() {
	req = req.bind(this)

	return new Promise((resolve, reject) => {
		req('/lodestone').then((res) => {
			//proper timestamp
			let gen = correctCase('generated', this.globalParams.snake_case)
			res[gen] = new Date(res[gen] * 1000)
			//proper... well, timestamps
			const time = correctCase('time', this.globalParams.snake_case)
			for (let section of ['dev_posts', 'maintenance', 'news', 'notices', 'status', 'topics', 'updates']) {
				section = correctCase(section, this.globalParams.snake_case)
				for (let i = 0; i < res[section].length; i++) {
					res[section][i][time] = new Date(res[section][i][time] * 1000)
				}
			}

			resolve(res)
		}).catch((err) => {
			reject(err)
		})
	})
}
