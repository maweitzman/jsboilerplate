import {UserValidator, RolesValidator} from '../validators/user';
import ValidationService from '../services/validation';
import ValidationError from '../errors/validation';
import UserService from '../services/user';
import ResponseService from '../services/response';

class UserController {
    create(req, res, next) {
        const result = ValidationService.validate(req.body, UserValidator);
        if (! result) {
            UserService.create(req.body)
            .then(response => {
                const message = 'The new user, ' + response.username + ', was successfully created!';
                ResponseService.successful(res, response, message);
            })
            .catch(next);
        } else {
            throw new ValidationError(result);
        }
    }

    allUsers(res, next) {
        UserService.allUsers()
        .then(response => {
            const message = 'All users have been returned successfully.';
            ResponseService.informational(res, response, message);
        })
        .catch(next);
    }

    allRoles(res, next) {
        UserService.allRoles()
        .then(response => {
            const message = 'All roles have been returned successfully.';
            ResponseService.informational(res, response, message);
        })
        .catch(next);
    }

    one(req, res, next) {
        UserService.one(req.params.id)
        .then(response => {
            const message = 'Successfully found User: ' + response.username + '!';
            ResponseService.informational(res, response, message);
        })
        .catch(next);
    }

    updateInfo(req, res, next) {
        const body = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        const result = ValidationService.validate(body, UserValidator);
        if (! result) {
            UserService.updateInfo(req.params.id, req.body)
            .then(response => {
                const message = 'Successfully edited ' + response.username + '!';
                ResponseService.successful(res, response, message);
            })
            .catch(next);
        } else {
            throw new ValidationError(result);
        }
    }

    updateRoles(req, res, next) {
        const result = ValidationService.validate({roles: req.body}, RolesValidator);
        if (! result) {
            UserService.updateRoles(req.params.id, req.body)
            .then(response => {
                const message = 'Successfully edited ' + response.username + '!';
                ResponseService.successful(res, response, message);
            })
            .catch(next);
        } else {
            throw new ValidationError(result);
        }
    }

    delete(req, res, next) {
        UserService.delete(req.params.id)
        .then(response => {
            const message = 'Successfully deleted ' + response.username + '!';
            ResponseService.successful(res, response, message);
        })
        .catch(next);
    }
};

export default new UserController();