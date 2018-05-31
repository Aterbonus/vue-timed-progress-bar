module.exports = {
    cleanOutDir: process.env.NODE_ENV === 'production',
    entry: {
        realtime:
            process.env.NODE_ENV === 'production'
                ? 'src/TimerProgressBar.vue'
                : 'src/index.js'
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