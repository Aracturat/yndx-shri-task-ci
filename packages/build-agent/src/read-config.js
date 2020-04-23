const config = require('../agent-conf.json');
const consoleConfig = require('yargs').argv;


process.env.PORT = process.env.PORT || consoleConfig.port || config.port;
process.env.SERVER_HOST = process.env.SERVER_HOST || consoleConfig.serverHost || config.serverHost;
process.env.SERVER_PORT = process.env.SERVER_PORT || consoleConfig.serverPort || config.serverPort;
