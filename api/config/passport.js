import passport from 'passport';
import UserRepository from '../repositories/user';
import ServiceError from '../errors/service';

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    (username, password, done) => {
        UserRepository.findUserByUsername(username)
        .then(user => {
            if (! user) {
                return done(
                    new ServiceError(
                        'No user exists with that username. Please try again.',
                        [
                            {username: 'Username does not exist.'}
                        ]
                    )
                );
            }
            if (! user.verifyPassword(password)) {
                return done(
                    new ServiceError(
                        'The password you provided was incorrect. Please try again.',
                        [
                            {password: 'Incorrect password.'}
                        ]
                    )
                );
            }
            return done(null, user);
        });
    }
));