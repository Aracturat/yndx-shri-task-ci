const config = require('../agent-conf.json');

process.env.PORT = process.env.PORT || config.port;
process.env.SERVER_HOST = process.env.SERVER_HOST || config.serverHost;
process.env.SERVER_PORT = process.env.SERVER_PORT || config.serverPort;
