const configureApi = require('./configure-api');
const configureSwagger = require('./configure-swagger');

function configure(app) {
	configureApi(app);
	configureSwagger(app);
}

module.exports = configure;
