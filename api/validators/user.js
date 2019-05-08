import Joi from '@hapi/joi';

const UserValidator = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    roles: Joi.array().items(Joi.number()),
    username: Joi.string().required(),
    password: Joi.string().required()
});

const RolesValidator = Joi.object().keys({
    roles: Joi.array().items(Joi.number()).required()
});

module.exports = {
    UserValidator,
    RolesValidator
}