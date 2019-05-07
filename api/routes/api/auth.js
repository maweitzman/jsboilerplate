import AuthController from '../../controllers/auth';

module.exports = (server) => {
    server.post('/api/auth/login', (req, res, next) => {
        AuthController.login(req, res, next);
    });
};