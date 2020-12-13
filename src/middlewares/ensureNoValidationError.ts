import { validationResult } from 'express-validator';
import HttpValidationError from '../models/errors/HttpValidatonError';
import { Request, Response } from 'express';

export default function ensureNoValidationError(req: Request, res: Response, next: () => void): void {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpValidationError(errors);
    }
    next();
}
