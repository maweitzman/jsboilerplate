import models from '../models';

class UserRepository {
    createUser(body) {
        return models.User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            email: body.email,
            password: models.User.hashPassword(body.password)
        });
    }

    setUserRoles(user, roles) {
        return user.setRoles(roles);
    }

    findAllUsers() {
        return models.User.findAll();
    }

    findAllRoles() {
        return models.Role.findAll();
    }

    findUserById(id) {
        return models.User.findOne({
            where: {
                id
            },
            include: [models.Role]
        });
    }

    findUserByUsername(username) {
        return models.User.findOne({
            where: {
                username
            },
            include: [models.Role]
        });
    }

    getPlainUserObject(data) {
        return data.get({
            plain: true
        });
    }

    updateUserInfo(user, info) {
        return user.update({
            firstName: info.firstName,
            lastName: info.lastName,
            username: info.username,
            email: info.email
        });
    }

    deleteUser(user) {
        return user.destroy();
    }
}

export default new UserRepository();