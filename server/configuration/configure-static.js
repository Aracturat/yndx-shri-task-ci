const express = require('express');
const path = require('path');

function configureStatic(app) {
	// В данный момент у нас две папки со статическими файлами, одна генерируется webpack, вторая хранит html.
	app.use(express.static(path.resolve(__dirname, '../../dist')));
	app.use(express.static(path.resolve(__dirname, '../../public')));
}

module.exports = configureStatic;
