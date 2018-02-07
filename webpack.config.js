const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "style.css",
});

const config = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dest'),
        filename: 'app.js'
    },

    devtool: 'source-map',

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ],
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, "./"),
        compress: true,
        port: 3000,
        hot: true,
        overlay: true

    },

    plugins: [
        new ExtractTextPlugin("css/styles.css"),

        new BrowserSyncPlugin(
            {
                // browse to http://localhost:3000/ during development,
                // ./public directory is being served
                host: 'localhost',
                port: 3100,
                proxy: 'localhost:3000',
                open: 'external',
                files: ['./index.html']
            },
            {
                reload: true
            }
        )
    ]
};

module.exports = config;
