import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

export default (sequelize, type) => {
    const User = sequelize.define('User', {
        id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: type.STRING,
            allowNull: false,
            notEmpty: true
        },
        lastName: {
            type: type.STRING,
            allowNull: false,
            notEmpty: true
        },
        username: {
            type: type.STRING,
            allowNull: false,
            notEmpty: true,
            unique: true
        },
        email: {
            type: type.STRING,
            allowNull: false,
            isEmail: true,
            notEmpty: true,
            unique: true
        },
        password: {
            type: type.STRING,
            allowNull: false,
            notEmpty: true
        }
    });

    User.associate = (models) => {
        models.User.belongsToMany(models.Role, {through: 'UsersRoles'});
    }

    User.hashPassword = (password) => {
        return bcrypt.hashSync(password, 10);
    }

    User.prototype.verifyPassword = function(givenPassword) {
        return bcrypt.compareSync(givenPassword, this.password);
    }

    User.prototype.roleNames = function() {
        let roles = [];
        for (let role of this.Roles) {
            roles.push(role.name);
        }
        return roles;
    }

    User.prototype.generateToken = function() {
        return jwt.sign(
            {
                id: this.id,
                firstName: this.firstName,
                lastName: this.lastName,
                name: this.firstName + ' ' + this.lastName,
                username: this.username,
                email: this.email,
                roles: this.roleNames()
            },
            process.env.JWT_SECRET,
            authConfig.jwt
        );
    }

    return User;
}