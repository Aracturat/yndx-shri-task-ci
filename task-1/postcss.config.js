module.exports = {
	plugins: {
		'postcss-url':[
			{ filter: '**/fonts/*', url: 'rebase' },
			{
				basePath: __dirname,
				url: 'inline',
				encodeType: 'base64'
			},
		],
		'postcss-preset-env': {}
	}
};
