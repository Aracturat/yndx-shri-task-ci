const express = require('express');
const db = require('../db-api');

function configureApi(app) {
    app.use(express.json());

    app.get('/api/settings', async function (req, res) {
        const config = await db.getBuildConfiguration();

        res.send(config);
    });

    app.post('/api/settings', async function (req, res) {
        await db.setBuildConfiguration({
            repoName: req.body.repoName,
            buildCommand: req.body.buildCommand,
            mainBranch: req.body.mainBranch,
            period: req.body.period
        });

        res.end();
    });

    app.get('/api/builds', async function (req, res) {
        const buildList = await db.getBuildList({
            limit: req.query.limit,
            offset: req.query.offset
        });

        res.send(buildList);
    });

    app.post('/api/builds/:commitHash', async function (req, res) {
        await db.requestBuild({
            commitMessage: 'Message',
            commitHash: req.params.commitHash,
            authorName: 'Author',
            branchName: 'master'
        });

        res.end();
    });

    app.get('/api/builds/:buildId', async function (req, res) {
        const build = await db.getBuildDetails({
            buildId: req.params.buildId
        });

        res.send(build);
    });

    app.get('/api/builds/:buildId/logs', async function (req, res) {
        const buildLog = await db.getBuildLog({
            buildId: req.params.buildId
        });

        res.send(buildLog);
    });
}

module.exports = configureApi;
