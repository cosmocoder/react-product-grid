var path = require('path')
var HTMLWebpackPlugin = require('html-webpack-plugin')
var autoprefixer = require('autoprefixer')
var pxtorem = require('postcss-pxtorem')
var mqpacker = require('css-mqpacker')

var PATHS = {
    app: path.join(__dirname, 'static'),
    build: path.join(__dirname, 'dist')
}

var PORT = (process.env.PORT + 1) || 8080

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: PATHS.app + '/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    devServer: {
        proxy: {
            '*': {
                target: 'http://localhost:8000'
            }
        },
        port: PORT
    },

    entry: [
        PATHS.app + '/index.js'
    ],

    output: {
        path: PATHS.build,
        filename: 'index_bundle.js'
    },

    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
            {test: /\.css$/, loader: 'style!css!postcss!sass'}
        ]
    },

    postcss: function () {
        return [
            autoprefixer({browsers: 'safari >= 6, ie >= 9'}),
            pxtorem({replace: false, rootValue: 14})
        ]
    },

    plugins: [HTMLWebpackPluginConfig]
}
