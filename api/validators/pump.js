import Joi from '@hapi/joi';

module.exports = Joi.object().keys({
    name: Joi.string().required()
});