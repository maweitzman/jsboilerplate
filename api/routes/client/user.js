import AuthService from '../../services/auth';

module.exports = (app, server) => {
    server.use('/users', AuthService.verifyToken('Admin'), (req, res, next) => {
        next();
    });

    server.get('/users/:id/edit', (req, res) => {
        return app.render(req, res, '/users/edit', {id: req.params.id});
    });
};