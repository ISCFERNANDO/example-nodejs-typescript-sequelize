
import { UserModel } from '../src/entities/UserModel';
import connection from '../src/utils/sequelize';

import App from '../src/app';
import { Server } from 'http';

let server: Server;
export const initializeServer = async () => {
    const app: App = new App();
    server = app.listen(() => { });
    return app.app;
}

export const destroyServer = async () => {
    server.close();
}

export const initializeDatabase = async () => {
    await UserModel.sync({ force: true });
}

export const clearDatabase = async () => {
    await connection.close();
}

