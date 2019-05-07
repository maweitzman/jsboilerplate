import PumpController from '../../controllers/pump';
import AuthService from '../../services/auth';

module.exports = (server) => {
    server.use('/api/pumps', AuthService.verifyToken('User'), (req, res, next) => {
        next();
    });

    server.post('/api/pumps', (req, res, next) => {
        PumpController.create(req, res, next);
    });

    server.get('/api/pumps', (req, res, next) => {
        PumpController.all(res, next);
    });

    server.get('/api/pumps/:id', (req, res, next) => {
        PumpController.one(req, res, next);
    });

    server.put('/api/pumps/:id', (req, res, next) => {
        PumpController.update(req, res, next);
    });

    server.delete('/api/pumps/:id', (req, res, next) => {
        PumpController.delete(req, res, next);
    });
};