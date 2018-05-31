module.exports = {
    cleanOutDir: process.env.NODE_ENV === 'production',
    css: {
        extract: false
    },
    entry: {
        realtime:
            process.env.NODE_ENV === 'production'
                ? 'src/TimedProgressBar.vue'
                : 'src/index.js'
    },
    filename: {
        js: 'vue-timed-progress-bar.js',
        css: 'vue-timed-progress-bar.css'
    },
    devServer: {
        contentBase: ['src/static-no-copy']
    },
    html: {
        template: 'src/index.html',
        inject: 'body'
    },
    format: process.env.NODE_ENV === 'production' ? 'umd' : undefined,
    moduleName: 'TimedProgressBar',
    chainWebpack(config, context) {
        config.output.libraryExport('default')
    }
}