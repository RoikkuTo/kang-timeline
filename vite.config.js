const path = require('path')

module.exports = {
	build: {
		lib: {
			entry: path.resolve(__dirname, 'lib/Timeline.ts'),
			name: 'Timeline',
			fileName: format => `timeline.${format}.js`
		}
	}
}
