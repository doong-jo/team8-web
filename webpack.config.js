const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/index.jsx'],
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },
    
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react', 'stage-3']
                }
            },
            {
                test: /\.(js|jsx)$/,
                use: ['eslint-loader'],
                exclude: [/node_modules/, path.resolve(__dirname, 'src/components/')],
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[local]',
                        },
                    },
                ],
                
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
					    options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
					    },
				    },
				    {
                        loader: 'sass-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]',
                        },
				    },
                ],
            },
            {
                test: /\.(gif|png|jpg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss'],
    }
};