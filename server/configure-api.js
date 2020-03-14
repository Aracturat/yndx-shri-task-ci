function configureApi(app) {
    app.get('/api/settings', function (req, res) {
        res.send('GET /api/settings');
    });

    app.post('/api/settings', function (req, res) {
        res.send('POST /api/settings');
    });

    app.get('/api/builds', function (req, res) {
        res.send('GET /api/builds');
    });

    app.post('/api/builds/:commitHash', function (req, res) {
        res.send(`POST /api/builds/${req.params.commitHash}`);
    });

    app.get('/api/builds/:buildId', function (req, res) {
        res.send(`GET /api/builds/${req.params.buildId}`);
    });

    app.get('/api/builds/:buildId/logs', function (req, res) {
        res.send(`GET /api/builds/${req.params.buildId}/logs`);
    });
}

module.exports = configureApi;
