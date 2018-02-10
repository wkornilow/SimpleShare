const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Simple share',
            template: './index.html'
        }),
        new CleanWebpackPlugin(['dist']),
    ],
    output: {
        filename: 'sharing.js',
        path: path.resolve(__dirname, 'dist')
    },
};
