const { InjectManifest } = require('workbox-webpack-plugin');

function injectManifestWebpackPlugin(config) {
	config.plugins.push(
		new InjectManifest({
			swSrc: './src/service-worker.js',
			swDest: 'service-worker.js',
			compileSrc: false,
			injectionPoint: '__WEBPACK_FILES__'
		})
	);

	return config;
}


module.exports = config => {
	require('react-app-rewire-postcss')(config, true);
	injectManifestWebpackPlugin(config)

	return config;
};
