const path = require('path');

module.exports = {
    entry: './src/App.jsx',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    'react-hot-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'react']
                        }
                    }
                ]
            },
			{
				test: /\.styl$/,
				use: ['style-loader', 'css-loader', 'stylus-loader']
			}
        ]
    },

    devServer: {
		inline: true,
		contentBase: './build',
		port: 9090,
        host: '192.168.0.100'
        // proxy: {
        //     '/api': 'http://localhost:3000'
        // }
    },

    devtool: 'cheap-eval-source-map',
    
    resolve: {
        extensions: ['.js', '.jsx', '.json', '*']
    }
};