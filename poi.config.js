module.exports = {
    cleanOutDir: process.env.NODE_ENV === 'production',
    css: {
        extract: false
    },
    entry: {
        realtime:
            process.env.NODE_ENV === 'production'
                ? 'src/TimerProgressBar.vue'
                : 'src/index.js'
    },
    filename: {
        js: 'vue-timer-progress-bar.js',
        css: 'vue-timer-progress-bar.css'
    },
    devServer: {
        contentBase: ['src/static-no-copy']
    },
    html: {
        template: 'src/index.html',
        inject: 'body'
    },
    format: process.env.NODE_ENV === 'production' ? 'umd' : undefined,
    moduleName: 'TimerProgressBar',
    chainWebpack(config, context) {
        config.output.libraryExport('default')
    }
}