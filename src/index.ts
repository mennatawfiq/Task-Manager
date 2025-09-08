import express from 'express';
import path from 'path';
import tasks from './routers/tasks';
import { connectDB } from './db/connect';
import dotenv from 'dotenv';
import { notFound } from './middlewares/notFound';
import { errHandler } from './middlewares/errorHandler';

const app = express();

app.use(express.static(path.resolve(__dirname, './public'))); app.use(express.json());

dotenv.config();

const port = process.env['PORT'];

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errHandler);

const start = async () => {
    try {
        await connectDB(process.env['MONGO_URI'] as string);
        app.listen(port, () => { console.log(`lisening on port ${port}`); });
    } catch (err) {
        console.log(`error at start: ${err}`);
    }
}

start();