import CustomError from './custom';

class UnauthorizedError extends CustomError {
    constructor() {
        const name = 'UnauthorizedError';
        const status = 401;
        const message = 'Your session does not exist, or has expired. Please log in to try again.';
        const errors = null;
        super(name, status, message, errors);
        Error.captureStackTrace(this, this.constructor);
    }
}

export default UnauthorizedError;