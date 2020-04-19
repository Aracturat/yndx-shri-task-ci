const express = require('express');

const config = require('./server-conf.json');

process.env.PORT = config.port;
process.env.API_BASE_URL = config.apiBaseUrl;
process.env.API_TOKEN = config.apiToken;

const configure = require('./src/configuration');

const app = express();
configure(app);

const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log(`School CI Build Server is listening on port ${port}.`)
});
