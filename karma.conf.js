const webpackConfig = require('./webpack.test.babel')

module.exports = (config) => {
    config.set({
        frameworks: ['mocha', 'chai'],
        reporters: ['mocha'],
        browsers: ['PhantomJS'],
        autoWatch: false,
        singleRun: true,
        files: ['test-bundler.js'],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-mocha',
            'karma-chai',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-mocha-reporter'
        ],
        preprocessors: {
            'test-bundler.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        }
    })
}
