var fs = require('fs');
var url = require('url');
var path = require('path');
var webpack = require('webpack');
var ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

module.exports = {
	// Main entry directory and file
	entry: {
		app: './app/main.js'
	},

	// Output directories and file
	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
		chunkFilename: '[name].chunk.js',
		publicPath: '/durandal-webpack/dist/'
	},

	// Custom plugins
	plugins: [
        new ContextReplacementPlugin(
            /durandal(\\|\/)js/,
            path.join(__dirname, 'src'))
	],

	module: {
		loaders: [
			{ test: /\.html$/, loader: 'html-loader' },
			{ test: /\.json$/, loader: 'json-loader' }
		]
	},

	resolve: {
		extensions: ['.js', '.jsx', '.json'],

		modules: [
			'node_modules',
			'app',
            'lib'
		],

		alias: {
			durandal: 'durandal/js',
			plugins: 'durandal/js/plugins'
		}
	},

	externals: {
		jquery: 'jQuery'
	},

	devServer: {
		contentBase: __dirname,
		hot: false,
		inline: true,
		historyApiFallback: true,
		stats: { colors: true }
	}
};
