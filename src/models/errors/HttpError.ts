import { BAD_REQUEST } from 'http-status-codes';

class HttpError extends Error {
    statusCode = BAD_REQUEST;
    description?: string;

    constructor(message: string, statusCode = BAD_REQUEST, description?: string) {
        super();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, HttpError);
        }

        this.name = 'HttpError';
        this.message = message;
        if (statusCode) {
            this.statusCode = statusCode;
        }
        if (description) {
            this.description = description;
        }
    }
}

export default HttpError;
