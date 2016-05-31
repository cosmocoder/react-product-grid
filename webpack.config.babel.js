import webpack from 'webpack'
import path from 'path'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer'
import pxtorem from 'postcss-pxtorem'
import mqpacker from 'css-mqpacker'

const LAUNCH_COMMAND = process.env.npm_lifecycle_event

const isProduction = LAUNCH_COMMAND === 'production'

const PATHS = {
    app: path.join(__dirname, 'static'),
    build: path.join(__dirname, 'dist')
}

const PORT = (process.env.PORT + 1) || 8080

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: PATHS.app + '/index.html',
    filename: 'index.html',
    inject: 'body'
})

const ExtractTextPluginConfig = new ExtractTextPlugin('style.css', {allChunks: false})

const productionPlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
})

const base = {
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
            {test: /\.scss$/, loader: 'style!css?sourceMap&importLoaders!postcss?sourceMap!sass?sourceMap'}
        ]
    },

    resolve: {
        root: path.resolve('./static')
    }
}

const developmentConfig = {
    devTool: 'cheap-inline-source-map',

    devServer: {
        proxy: {
            '*': {
                target: 'http://localhost:8000'
            }
        },
        port: PORT,
        inline: true
    },

    postcss: function () {
        return [
            autoprefixer({browsers: 'safari >= 6, ie >= 9'}),
            pxtorem({replace: false, rootValue: 14})
        ]
    },

    plugins: [HTMLWebpackPluginConfig]
}

const productionConfig = {
    devTool: 'cheap-source-map',

    postcss: function () {
        return [
            autoprefixer({browsers: 'safari >= 6, ie >= 9'}),
            pxtorem({replace: false, rootValue: 14}),
            mqpacker
        ]
    },

    plugins: [HTMLWebpackPluginConfig, ExtractTextPluginConfig, productionPlugin]
}

export default Object.assign({}, base, isProduction ? productionConfig : developmentConfig)
