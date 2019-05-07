import AuthService from '../../services/auth';

module.exports = (app, server) => {
    server.use('/pumps', AuthService.verifyToken('User'), (req, res, next) => {
        next();
    });

    server.get('/pumps/:id/edit', (req, res) => {
        return app.render(req, res, '/pumps/edit', {id: req.params.id});
    });
};