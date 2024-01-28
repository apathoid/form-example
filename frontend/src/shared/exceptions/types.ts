/** A structure of an error sent by the server. */
export type ApiErrorEntry = {
    /** Type of the error. */
    type: string;
    /** Error message. */
    msg: string;
    /** Path to the source of the problem. Depends on the type of the error. */
    path: string;
    /** Context of the error. */
    location: string;
};
