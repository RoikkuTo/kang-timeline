import babel from '@rollup/plugin-babel'
import { terser } from "rollup-plugin-terser"

export default {
    input: 'src/Timeline.js',
    output: [{
        name: 'UMDBundle',
        file: 'dist/bundle.umd.js',
        format: 'umd'
    },
    {
        name: 'ESBundle',
        file: 'dist/bundle.es.js',
        format: 'es'
    }],
    plugins: [
        babel({
            exclude: 'node_modules/**'
        }),
        terser()
    ]
}
