import './src/read-config';

import express from 'express';

import { checkBuilds } from './src/watchers/build-watcher';
import { checkAgents } from './src/watchers/check-agent-watcher';

import configure from './src/configuration';

const app = express();
configure(app);

checkBuilds();
checkAgents();

const port = process.env.PORT;
app.listen(port, function() {
	console.log(`School CI Build Server is listening on port ${port}.`)
});
