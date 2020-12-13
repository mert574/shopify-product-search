import { BAD_REQUEST } from 'http-status-codes';
import HttpError from './HttpError';

class HttpHandlerError extends HttpError {
    constructor(message: string, statusCode = BAD_REQUEST, description?: string) {
        super(message, statusCode, description);
        this.name = 'HttpHandlerError';
    }
}

export default HttpHandlerError;
