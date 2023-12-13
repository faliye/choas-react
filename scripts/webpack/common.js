const path = require('path');
const TerserWebpack =  require("terser-webpack-plugin");
const { createEntries } = require('./function');

module.exports = {
    entry: createEntries(),
    mode: "production",
    output: {
        path: path.join(__dirname, '../../lib'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                    { loader: 'sass-loader' },
                ],
            },
            {
                test: /\.tsx?$/,
                use: [
                    { loader: 'ts-loader' },
                ]
            }
        ]
    },
    plugins:[
        new TerserWebpack({
            extractComments: false,
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};