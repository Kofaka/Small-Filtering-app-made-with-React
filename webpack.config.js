const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
});

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundled.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'src'),
                loader: 'style-loader!css-loader!postcss-loader!sass-loader'
            }
        ]
    },
    resolve: {extensions: ['*', '.js', '.jsx']},
    plugins: [htmlPlugin],
    devServer: {
        port: 3000,
        historyApiFallback: true
    }
};
