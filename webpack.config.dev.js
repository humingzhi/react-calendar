var path = require('path')
var webpack = require('webpack')

module.exports = {
    debug: true,
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client',
        './example'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'react-calendar.js',
        publicPath: '/dist/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        root: __dirname
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.css?$/,
                loader: 'style-loader!css-loader',
                include: __dirname
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.(png|jpg|gif)$/i,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
        ]
    }
}
