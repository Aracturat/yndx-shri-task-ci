import dotEnv from 'dotenv';
import path from 'path';
import express from 'express';

// Loading of environment variables should be the first action in the app.
dotEnv.config({ path: path.join(__dirname, 'server.env') });

const configure = require('./src/configuration');

const app = express();
configure(app);

const port = process.env.APP_PORT || 3000;
app.listen(port, function() {
	console.log(`School CI Server listening on port ${port}.`)
});
