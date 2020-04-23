require('./src/read-config');

const express = require('express');

const { checkBuilds } = require('./src/watchers/build-watcher');
const { checkAgents } = require('./src/watchers/check-agent-watcher');

const configure = require('./src/configuration');

const app = express();
configure(app);

checkBuilds();
checkAgents();

const port = process.env.PORT;
app.listen(port, function() {
	console.log(`School CI Build Server is listening on port ${port}.`)
});
