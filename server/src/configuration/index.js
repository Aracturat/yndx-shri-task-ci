const configureApi = require('./configure-api');
const configureSwagger = require('./configure-swagger');
const configureStatic = require('./configure-static');

function configure(app) {
	configureApi(app);
	configureSwagger(app);
	configureStatic(app);
}

module.exports = configure;
