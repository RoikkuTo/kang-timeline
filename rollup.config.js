import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from "rollup-plugin-terser"

export default {
	input: 'src/Timeline.js',
	output: [{
		name: 'umd',
		file: 'dist/bundle.umd.js',
		format: 'umd'
	}, {
		file: 'dist/bundle.es.js',
		format: 'es'
	}],
	plugins: [
		commonjs(),
		resolve({
			browser: true
		}),
		babel({
			exclude: 'node_modules/**',
			babelHelpers: 'runtime'
		}),
		terser()
	],
	// external: [/@babel\/runtime/]
}