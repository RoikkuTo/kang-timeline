const path = require('path')

module.exports = {
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/Timeline.ts'),
			name: 'Timeline',
			fileName: format => `timeline.${format}.js`
		}
	}
}
