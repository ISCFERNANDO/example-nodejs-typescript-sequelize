import express, { Application } from 'express';
import bodyParser from 'body-parser';
require('dotenv').config();

import routes from './routes';

export default class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(routes);
        this.app.set('port', process.env.PORT || 3001);
    }

    public listen() {
        this.app.listen(3001, () => {
            console.log(`App is running on http://localhost:${this.app.get('port')}`);
            console.log(this.app.get('env'));
        });
    }
}
