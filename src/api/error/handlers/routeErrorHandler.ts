import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import logger from '../../../util/logger';
import HttpError from '../../../models/errors/HttpError';
import * as util from 'util';

export default function routeErrorHandler(err: Error, req: Request, res: Response, _next: () => void): void {
    const errorBody = { error: err.name, message: err.message };
    if (!res.headersSent) {
        if (err instanceof HttpError) {
            res.status(err.statusCode);
            if (err.message || err.description) {
                res.json(errorBody);
            } else {
                res.end();
            }
        } else if (process.env.NODE_ENV === 'development') {
            logger.error('route error.', { error: util.inspect(err) });
            res.status(INTERNAL_SERVER_ERROR).json({ error: err.message || 'An error occurred.' });
        } else {
            logger.error('route error.', { error: util.inspect(err) });
            res.status(INTERNAL_SERVER_ERROR).json({ error: 'An error occurred.' });
        }
    }
}
