var fs = require('fs');
var url = require('url');
var path = require('path');
var webpack = require('webpack');

var DEBUG = !process.argv.production;

var GLOBALS = {
	'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
	'__DEV__': DEBUG
};

module.exports = {
	// Main entry directory and file
	entry: {
		app: [
			// 'webpack/hot/dev-server',
			path.join(__dirname, 'app', 'main.js')
		]
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
		new webpack.DefinePlugin(GLOBALS)
	]
	.concat(DEBUG ? [] : [
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.AggressiveMergingPlugin()
	]),

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
