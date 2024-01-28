import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../exceptions/ApiError';


/** Handles errors occured in the middleware chain. */
export function errorMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }

    return res.status(500).json({ message: 'Something bad has hapend on the API side' });
}
