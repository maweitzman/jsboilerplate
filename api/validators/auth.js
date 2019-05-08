import Joi from '@hapi/joi';

module.exports = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required()
});