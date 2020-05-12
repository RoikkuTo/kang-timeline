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
    }]
}
