import UserRepository from '../repositories/user';
import ServiceError from '../errors/service';

class UserService {
    create(body) {
        return UserRepository.findUserByUsername(body.username)
        .then(user => {
            if (! user) {
                return UserRepository.createUser(body)
                .then(created => {
                    UserRepository.setUserRoles(created, body.roles);
                    return UserRepository.getPlainUserObject(created);
                })
                .catch(error => {
                    throw error;
                });
            } else {
                throw new ServiceError(
                    'A user with that username already exists.',
                    [
                        {username: 'Username already taken.'}
                    ]
                );
            }
        })
        .catch(error => {
            throw error;
        });
    }

    allUsers() {
        return UserRepository.findAllUsers()
        .then(response => {
            const users = response.map((user) => (user.toJSON()));
            return users;
        })
        .catch(error => {
            throw error;
        });
    }

    allRoles() {
        return UserRepository.findAllRoles()
        .then(response => {
            const roles = response.map((role) => (role.toJSON()));
            return roles;
        })
        .catch(error => {
            throw error;
        });
    }

    one(id) {
        return UserRepository.findUserById(id)
        .then(user => {
            return UserRepository.getPlainUserObject(user);
        })
        .catch(error => {
            throw error;
        });
    }

    updateInfo(id, user) {
        return UserRepository.findUserById(id)
        .then(found => {
            return UserRepository.updateUserInfo(found, user)
            .then(updated => {
                return UserRepository.getPlainUserObject(updated);
            })
            .catch(error => {
                throw error;
            });
        })
        .catch(error => {
            throw error;
        });
    }

    updateRoles(id, roles) {
        return UserRepository.findUserById(id)
        .then(found => {
            UserRepository.setUserRoles(found, roles);
            return UserRepository.getPlainUserObject(found);
        })
        .catch(error => {
            throw error;
        });
    }

    delete(id) {
        return UserRepository.findUserById(id)
        .then(user => {
            return UserRepository.deleteUser(user)
            .then(() => {
                return UserRepository.getPlainUserObject(user);
            })
            .catch(error => {
                throw error;
            });
        })
        .catch(error => {
            throw error;
        });
    }
}

export default new UserService();