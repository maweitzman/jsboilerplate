class CustomError extends Error {
    constructor(name, status, message, errors) {
        super(message);
        this.name = name;
        this.status = status;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default CustomError;