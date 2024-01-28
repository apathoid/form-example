import { AxiosError } from 'axios';

import { ApiErrorEntry } from './types';


/** Interface of an error raised during client-server communications. */
export class ApiError extends Error {
    message: string;
    errors?: ApiErrorEntry[];

    constructor(message: string, errors?: ApiErrorEntry[]) {
        super(message);

        this.message = message;
        this.errors = errors;
    }

    /** Converts API response to an error of ApiError type. */
    static responseToError(e: unknown) {
        if (e instanceof AxiosError) {
            return new ApiError(e.response?.data?.message || e.message, e.response?.data?.errors);
        }

        if (e && typeof e === 'object' && 'message' in e && 'errors' in e) {
            return new ApiError(e.message as string, e.errors as ApiErrorEntry[]);
        }

        return new ApiError('Unexpected exception');
    }
}
