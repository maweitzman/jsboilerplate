import AuthValidator from '../validators/auth';
import ValidationService from '../services/validation';
import ValidationError from '../errors/validation';
import AuthService from '../services/auth';

class AuthController {
    login(req, res, next) {
        const result = ValidationService.validate(req.body, AuthValidator);
        if (! result) {
            AuthService.login(req, res, next);
        } else {
            throw new ValidationError(result);
        }
    }
};

export default new AuthController();