import { ApiError } from '.';


/** Interface of an error raised during validation. */
export class ValidationError {
    type: string;
    path: string;
    message?: string;

    constructor(type: string, path: string, message?: string) {
        this.type = type;
        this.path = path;
        this.message = message;
    }

    /** Converts API error to an array of ValidationError. */
    static fromApiError(e: ApiError) {
        return e.errors?.map(error => new ValidationError(error.type, error.path, error.msg)) || [];
    }
}
