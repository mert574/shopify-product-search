import { Request, Response } from 'express';
import { NOT_FOUND } from 'http-status-codes';

export default function notFoundErrorHandler(req: Request, res: Response): void {
    res.status(NOT_FOUND).end('Not found.');
}
