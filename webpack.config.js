var path = require('path')
var HTMLWebpackPlugin = require('html-webpack-plugin')

var PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'dist')
}

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: PATHS.app + '/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    entry: [
        PATHS.app + '/index.js'
    ],

    output: {
        path: PATHS.build,
        filename: 'index_bundle.js'
    },

    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, loader: 'style!css'}
        ]
    },

    plugins: [HTMLWebpackPluginConfig]
}