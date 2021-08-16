import { resolve } from 'path'

export default {
	root: '.',
	build: {
		lib: {
			entry: resolve(__dirname, 'lib/Timeline.ts'),
			name: 'Timeline',
			formats: ['umd'],
			fileName: () => 'timeline.min.js'
		},
		emptyOutDir: false
	},
	resolve: {
		alias: {
			'@': __dirname,
			'@lib': resolve(__dirname, 'dist/Timeline'),
			'@icons': resolve(__dirname, 'src/icons')
		}
	}
}
