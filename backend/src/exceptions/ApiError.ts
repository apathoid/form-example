import { ValidationError } from 'express-validator';


/** Basic interface of an error. */
export class ApiError extends Error {
    message: string;
    status: number;
    errors?: ValidationError[];

    constructor(message: string, status: number, errors?: ValidationError[] | null) {
        super(message);

        this.message = message;
        this.status = status;

        errors && (this.errors = errors);
    }


    static Unauthorized() {
        return new ApiError('Unauthorized', 401);
    }

    static BadRequest(errors?: ValidationError[] | null, message = 'Unprocessable entity') {
        return new ApiError(message, 400, errors);
    }
}
