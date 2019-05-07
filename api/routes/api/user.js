import AuthService from '../../services/auth';
import UserController from '../../controllers/user';

module.exports = (server) => {
    server.use('/api/users', AuthService.verifyToken('Admin'), (req, res, next) => {
        next();
    });

    server.post('/api/users', (req, res, next) => {
        UserController.create(req, res, next);
    });

    server.get('/api/users', (req, res, next) => {
        UserController.allUsers(res, next);
    });

    server.get('/api/users/roles', (req, res, next) => {
        UserController.allRoles(res, next);
    });
    
    server.get('/api/users/:id', (req, res, next) => {
        UserController.one(req, res, next);
    });

    server.put('/api/users/:id/info', (req, res, next) => {
        UserController.updateInfo(req, res, next);
    });

    server.put('/api/users/:id/roles', (req, res, next) => {
        UserController.updateRoles(req, res, next);
    })

    server.delete('/api/users/:id', (req, res, next) => {
        UserController.delete(req, res, next);
    });
};