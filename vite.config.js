import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ command, mode }) => {
	if (command === 'build' && mode === 'lib') {
		return {
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
	} else {
		return {
			root: '.',
			base: './',
			build: {
				outDir: 'demo'
			},
			resolve: {
				alias: {
					'@': __dirname,
					'@lib': resolve(__dirname, 'dist/Timeline'),
					'@icons': resolve(__dirname, 'src/icons')
				}
			}
			// server: {
			// 	fs: {
			// 		strict: false
			// 	}
			// }
		}
	}
})
