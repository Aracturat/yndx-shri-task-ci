const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: [
		'./src/scss/index.scss'
	],
	devtool: 'source-map',
	devServer: {
		contentBase: './public'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css',
		})
	],
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: 'css-loader',
						options: { importLoaders: 2 }
					},
					'postcss-loader',
					'sass-loader'
				],
			}
		],
	},
};
