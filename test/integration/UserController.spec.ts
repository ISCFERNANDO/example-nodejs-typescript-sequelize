import { UserModel } from './../../src/entities/UserModel';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.testing' });
import connection from '../../src/utils/sequelize';
import request from 'supertest';
import App from '../../src/app';
import { Server } from 'http';
let app: App;
let server: Server;
beforeAll(async () => {
    app = new App();
    server = app.listen(() => { });

    const resp = await UserModel.sync({ force: true });
    console.log('resp ==> ', resp);
});

afterAll(() => {
    connection.close();
    server.close();
});

describe('Test UserController', () => {
    it('It should array in /users endpoint', async () => {
        const response = await request(app.app).get('/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    /*it('It should 200 in /users/:id endpoint', async () => {
        const response = await request(app.app).get('/users/1');
        expect(response.status).toBe(200);
    });*/
});