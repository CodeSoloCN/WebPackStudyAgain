let path = require('path')
let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let { CleanWebpackPlugin } = require('clean-webpack-plugin')
let MinICssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: '[name]-[hash:4].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '',
    },
    resolve:{
        alias: {
            '&static': path.resolve(__dirname, '../src/static'),
            '&components': path.resolve(__dirname, '../src/components'),
        }
    },
    devServer: {
        port: 3000,
        progress: true,
        compress: true,
        open: true,
        hot: true,
        proxy: {
        }
    },
    watchOptions: {
        aggregateTimeout: 500,
        poll: 1000,
        ignored: /node_modules/,
    },
    plugins: [
        new MinICssExtractPlugin({
            filename: '[name]-[hash:4].css'
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                },
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modeles/,
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.css$/,
                use: [
                    MinICssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MinICssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf)($|\?)/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100 * 1024,
                        name: 'font/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(png|gif|jpg|svg)($|\?)/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100*1024,
                        name: 'images/[name].[ext]'
                    }
                }
            },
        ]
    },
}
