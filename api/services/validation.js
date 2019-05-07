import Joi from 'joi';

class ValidationService {
    validate(data, schema) {
        const result = (Joi.validate(data, schema, {abortEarly: false}));
        if (result.error) {
            const errors = result.error.details;
            let messages = [];
            for (const error of errors) {
                messages.push({
                    [error.context.label]: error.message
                });
            }
            return messages;
        } else {
            return false;
        }
    }
}

export default new ValidationService();