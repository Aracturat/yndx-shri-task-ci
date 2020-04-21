require('./src/read-config');

const express = require('express');

const { checkWaitingBuilds } = require('./src/waiting-build-watcher');
const configure = require('./src/configuration');

const app = express();
configure(app);

checkWaitingBuilds();

const port = process.env.PORT;
app.listen(port, function() {
	console.log(`School CI Build Server is listening on port ${port}.`)
});
