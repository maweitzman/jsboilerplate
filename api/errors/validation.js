import CustomError from './custom';

class ValidationError extends CustomError {
    constructor(errors) {
        const name = 'ValidationError';
        const status = 400;
        const message = 'There was an error in your request. Please try again.';
        super(name, status, message, errors);
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ValidationError;