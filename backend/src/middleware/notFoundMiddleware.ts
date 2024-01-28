import { Request, Response } from 'express';

import { ApiError } from '../exceptions/ApiError';


/** Handles "not found" error. */
export function notFoundMiddleware(_req: Request, res: Response) {
    res.status(404).json(new ApiError('Not Found', 404));
}
