export const HOST = process.env.API_HOST ?? 'localhost';
export const PORT = +(process.env.API_PORT ?? 5000);
export const API_URL_PREFIX = process.env.API_URL_PREFIX ?? '/api/v1';
export const DB_HOST = process.env.DB_HOST ?? 'localhost';
export const DB_PORT = process.env.DB_PORT ?? 27017;
export const DB_NAME = process.env.DB_NAME ?? 'test_db';
export const DB_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;


export const WHITE_LISTED_ORIGINS = [
    `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
    `https://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`
];
