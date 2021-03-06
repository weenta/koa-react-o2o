const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dev = require('../config')
const port = dev.port
const proxyTarget = dev.proxyTarget

module.exports = {
    entry: path.resolve(__dirname, '../src/index.js'),

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: [
                            ["import", { "libraryName": "antd", "style": true }] 
                        ]
                    }
                }
            },
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'postcss-loader','less-loader']
            },
            {
                test: /\.(png|gif|jpg|jpeg|bmp)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5000
                    }
                }
            },
            {
                test: /\.(woff|woff2|svg|ttf|eot)($|\?)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 5000
                    }
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: path.resolve(__dirname, '../src/index.tpl.html'),
            filename: 'index.html'
        }),

        new webpack.HotModuleReplacementPlugin()
    ],

    devtool: 'source-map',

    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less'],
        alias: {
            "@": path.resolve(__dirname, '../src')
        }
    },

    devServer: {
        port:port,
        hot: true,
        contentBase: path.resolve(__dirname, '../dist'),
        proxy: {
            '/api': {
                target:proxyTarget,
                pathRewrite: { "^/api": "" }
            }
        }
    }
}