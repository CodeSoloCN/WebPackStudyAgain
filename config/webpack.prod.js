let { smart } = require('webpack-merge')
let base = require('./webpack.common.js')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = smart(base , {
    mode: 'production',
})