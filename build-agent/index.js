const express = require('express');

const config = require('./agent-conf.json');

process.env.PORT = config.port;
process.env.SERVER_HOST = config.serverHost;
process.env.SERVER_PORT = config.serverPort;

const configure = require('./src/configuration');

const app = express();
configure(app);

const port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log(`School CI Build Agent is listening on port ${port}.`)
});
