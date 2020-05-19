import babel from '@rollup/plugin-babel'

export default {
    input: 'src/timeline.js',
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
        })
    ]
}
