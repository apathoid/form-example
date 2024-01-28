import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './router';
import { errorMiddleware, notFoundMiddleware } from './middleware';
import { PORT, HOST, DB_URI, API_URL_PREFIX, WHITE_LISTED_ORIGINS } from './constants/app';


const app = express();

app.use(cors({ origin: WHITE_LISTED_ORIGINS }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(API_URL_PREFIX, router);
app.use(errorMiddleware);
app.use(notFoundMiddleware);


async function main() {
    try {
        app.listen(PORT, HOST, () => {
            console.log(`Server is listening on ${HOST}:${PORT}`);
        });

        await mongoose.connect(DB_URI);
    } catch (e) {
        console.log('There was an error: ', e);
    }
}


main();
