const path = require('path');
const express = require('express');

const app = express();

// В данный момент у нас две папки со статическими файлами, одна генерируется webpack, вторая хранит html.
app.use(express.static(path.resolve(__dirname, 'dist')));
app.use(express.static(path.resolve(__dirname, 'public')));


app.listen(3000);
