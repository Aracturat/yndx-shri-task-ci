const path = require('path');
const express = require('express');

const app = express();
const configureApi = require('./server/configure-api');
const configureSwagger = require('./server/configure-swagger');

// В данный момент у нас две папки со статическими файлами, одна генерируется webpack, вторая хранит html.
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(express.static(path.resolve(__dirname, 'public')));

configureApi(app);
configureSwagger(app);

app.listen(process.env.PORT || 3000);
