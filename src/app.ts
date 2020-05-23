import express, { Application } from 'express';
import bodyParser from 'body-parser';
require('dotenv').config();

import routes from './routes';
import { Server } from 'http';

export default class App {
    public app: Application;
    public port: number;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(routes);
        this.port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
    }

    public listen(callback: any): Server {
        return this.app.listen(this.port, callback);
    }
}
