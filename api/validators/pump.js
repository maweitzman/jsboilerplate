import Joi from 'joi';

module.exports = Joi.object().keys({
    name: Joi.string().required()
});