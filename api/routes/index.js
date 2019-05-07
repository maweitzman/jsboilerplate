import AuthService from '../services/auth';

module.exports = (app, server, handle) => {
    require('./api/auth')(server);
    require('./api/user')(server);
    require('./api/pump')(server);

    require('./client/user')(app, server);
    require('./client/pump')(app, server);

    server.get('/', AuthService.verifyToken('Any'), (req, res) => {
        return handle(req, res);
    });

    server.get('*', (req, res) => {
        if (req.url === '/logout') {
            res.clearCookie('bearer');
            res.redirect('/login?logout=true');
        }
        return handle(req, res);
    });

    server.use((error, req, res, next) => {
        if (req.url.includes('api')) {
            res.append('X-Message-Error', error.message);
            res.status(error.status).json(error);
        } else if (error.status === 401) {
            res.redirect('/login?auth=false');
        } else if (error.status === 403) {
            return app.render(req, res, '/error', {code: 403, message: 'You do not have permission to perform this request. Please check with your system administrator.'});
        }
    });
};