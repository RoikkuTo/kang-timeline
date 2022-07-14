import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ command, mode }) => {
	if (command === 'build' && mode === 'lib')
		return {
			root: '.',
			build: {
				lib: {
					entry: resolve(__dirname, 'lib/index.ts'),
					name: 'Timeline',
					formats: ['es', 'umd'],
					fileName: format => `timeline.${format}.js`
				},
				emptyOutDir: false
			},
			resolve: {
				alias: {
					'@': __dirname,
					'@lib': resolve(__dirname, 'lib'),
					'@icons': resolve(__dirname, 'src/icons')
				}
			}
		}
	else
		return {
			root: '.',
			base: './',
			build: {
				outDir: 'demo'
			},
			resolve: {
				alias: {
					'@': __dirname,
					'@lib': resolve(__dirname, 'lib'),
					'@icons': resolve(__dirname, 'src/icons')
				}
			}
		}
})
