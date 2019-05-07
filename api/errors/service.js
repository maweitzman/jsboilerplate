import CustomError from './custom';

class ServiceError extends CustomError {
    constructor(message, errors) {
        const name = 'ServiceError';
        const status = 400;
        super(name, status, message, errors);
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ServiceError;