import { BAD_REQUEST } from 'http-status-codes';
import { Result, ValidationError } from 'express-validator';
import HttpError from './HttpError';

class HttpValidationError extends HttpError {
    constructor(errors: Result<ValidationError>, statusCode = BAD_REQUEST, description?: string) {
        const message = errors.array().map(it => it.msg).join(', ');
        super(message, statusCode, description);

        this.name = 'HttpValidationError';
    }
}

export default HttpValidationError;
