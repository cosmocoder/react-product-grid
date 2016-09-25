const webpack = require('webpack')
const path = require('path')

const PATHS = {
    app: path.join(__dirname, 'static')
}

module.exports = {
    entry: [
        PATHS.app
    ],

    devTool: 'inline-source-map',

    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
            {test: /\.scss$/, loader: 'null'}
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ],

    resolve: {
        root: path.resolve('./static')
    }
}
