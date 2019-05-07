import jwt from 'jsonwebtoken';
import passport from 'passport';
import UserRepository from '../repositories/user';
import ForbiddenError from '../errors/forbidden';
import UnauthorizedError from '../errors/unauthorized';
import ResponseService from '../services/response';
import authConfig from '../config/auth';

class AuthService {
    login(req, res, next) {
        passport.authenticate('local', {session: false}, (err, user) => {
            if (user) {
                const message = 'Login was successful. Welcome, ' + req.body.username + '!';
                res.cookie('bearer', user.generateToken(), authConfig.cookie);
                ResponseService.successful(res, jwt.decode(user.generateToken()), message);
            }
            if (err) {
                next(err);
            }
        })(req, res, next);
    }
    
    verifyToken(required) {
        return (req, res, next) => {
            const token = req.signedCookies['bearer'];
            const payload = token ? jwt.decode(token) : null;
            if (typeof token !== 'undefined' && typeof payload !== 'undefined') {
                jwt.verify(token, process.env.JWT_SECRET, (err) => {
                    if (err) {
                        throw new UnauthorizedError();
                    } else {
                       UserRepository.findUserById(payload.id)
                        .then(user => {
                            if (! user) {
                                throw new UnauthorizedError();
                            } else {
                                let found = user.get({plain: true});
                                let allowed = false;
                                for (let role of found.Roles) {
                                    if (required === 'Any' || role.name === required) {
                                        allowed = true;
                                        break;
                                    }
                                }
                                if (allowed === true) {
                                    res.cookie('bearer', user.generateToken(), authConfig.cookie);
                                    next();
                                    return user;
                                } else {
                                    throw new ForbiddenError();
                                }
                            }
                        })
                        .catch(error => {
                            next(error);
                        });
                    }
                });
            } else {
                throw new UnauthorizedError();
            }
        }
    }
}

export default new AuthService();