import CustomError from './custom';

class ForbiddenError extends CustomError {
    constructor() {
        const name = 'ForbiddenError';
        const status = 403;
        const message = 'You do not have permission to perform this request. Please check with your system administrator.';
        const errors = null;
        super(name, status, message, errors);
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ForbiddenError;