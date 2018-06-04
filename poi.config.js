module.exports = {
    cleanOutDir: process.env.NODE_ENV === 'production',
    css: {
        extract: false
    },
    entry: process.env.NODE_ENV === 'production'
                ? 'src/TimedProgressBar.vue'
                : 'src/index.js',
    filename: {
        js: 'vue-timed-progress-bar.js',
        css: 'vue-timed-progress-bar.css'
    },
    format: process.env.NODE_ENV === 'production' ? 'umd' : undefined,
    moduleName: 'TimedProgressBar',
    chainWebpack(config, context) {
        config.output.libraryExport('default')
    }
}