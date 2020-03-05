module.exports = {
	plugins: {
		'postcss-url': {
			basePath: __dirname,
			url: 'inline',
			encodeType: 'base64'
		},
		'postcss-preset-env': {}
	}
};
