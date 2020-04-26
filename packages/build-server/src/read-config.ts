const config = require('../server-conf.json');

process.env.PORT = process.env.PORT || config.port;
process.env.API_BASE_URL = process.env.API_BASE_URL || config.apiBaseUrl;
process.env.API_TOKEN = process.env.API_TOKEN || config.apiToken;
