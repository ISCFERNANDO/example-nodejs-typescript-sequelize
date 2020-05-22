import express, { Application } from 'express';
import bodyParser from 'body-parser';
const config = require('dotenv').config();

if (config.error) {
    throw config.error;
}

import routes from './routes';
const app: Application = express();

app.use(bodyParser.json());
app.use(routes);
app.set('port', process.env.PORT || 3001);

app.listen(3001, () => {
    console.log(`App is running on http://localhost:${app.get('port')}`);
    console.log(app.get('env'));
});