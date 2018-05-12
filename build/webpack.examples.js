'use strict'

const merge = require('deep-assign')
const webpack = require('webpack')
const path = require('path')
const options = require('./options')
const base = require('./webpack.base.js')
const polyfill = require('babel-polyfill')

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

const config = merge(base, {
	// entry: options.paths.resolve('examples-src/index.js'),
	entry: ['babel-polyfill', options.paths.resolve('examples-src/index.js')],
	output: {
		filename: 'examples.bundle.js',
		path: options.paths.output.examples
	},
	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			components: resolve('examples-src/components'),
			src: resolve('src')
		}
	},
	plugins: [
		// Set the production environment
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			VERSION: JSON.stringify(options.version)
		})
	]
})

config.module.rules[0].options.loaders = {
	scss: 'vue-style-loader!css-loader!sass-loader'
}

module.exports = config
