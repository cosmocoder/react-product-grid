import webpack from 'webpack'
import path from 'path'
import HTMLWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'
import pxtorem from 'postcss-pxtorem'
import mqpacker from 'css-mqpacker'
import cssnano from 'cssnano'

const LAUNCH_COMMAND = process.env.npm_lifecycle_event
process.env.BABEL_ENV = LAUNCH_COMMAND

const isProduction = LAUNCH_COMMAND === 'production'

const PATHS = {
    app: path.join(__dirname, 'static'),
    build: path.join(__dirname, 'dist')
}

const PORT = process.env.PORT ? (process.env.PORT + 1) : 8080

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

const UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
        screw_ie8: true
    },
    comments: false
})

const base = {
    entry: [
        PATHS.app
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
    devTool: 'cheap-module-inline-source-map',

    devServer: {
        proxy: {
            '*': {
                target: 'http://localhost:8000'
            }
        },
        port: PORT,
        contentBase: PATHS.build,
        hot: true,
        inline: true,
        progress: true
    },

    postcss: function () {
        return [
            autoprefixer({browsers: 'safari >= 6, ie >= 9'}),
            pxtorem({replace: false, rootValue: 14})
        ]
    },

    plugins: [HTMLWebpackPluginConfig, new webpack.HotModuleReplacementPlugin()]
}

const productionConfig = {
    devTool: 'cheap-module-source-map',

    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css?sourceMap&importLoaders!postcss?sourceMap!sass?sourceMap')}
        ]
    },

    postcss: function () {
        return [
            autoprefixer({browsers: 'safari >= 6, ie >= 9'}),
            pxtorem({replace: false, rootValue: 14}),
            mqpacker,
            cssnano({
                discardComments: {
                    removeAll: true
                }
            })
        ]
    },

    plugins: [HTMLWebpackPluginConfig, UglifyJsPluginConfig, ExtractTextPluginConfig, productionPlugin]
}

export default Object.assign({}, base, isProduction ? productionConfig : developmentConfig)
