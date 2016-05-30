var path = require('path')
var HTMLWebpackPlugin = require('html-webpack-plugin')

var PATHS = {
    app: path.join(__dirname, 'static'),
    build: path.join(__dirname, 'dist')
}

var PORT = (process.env.PORT + 1) || 8080;

var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: PATHS.app + '/index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    devServer: {
        proxy: {
            '*' : {
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
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, loader: 'style!css'}
        ]
    },

    plugins: [HTMLWebpackPluginConfig]
}