import { UserModel } from './../../src/entities/UserModel';
import request from 'supertest';

import { initializeDatabase, clearDatabase, initializeServer, destroyServer } from '../Configuration';
import { Application } from 'express';
import { User } from '../../src/models/requests/User';

let app: Application;
beforeAll(async () => {
    await initializeDatabase();
    app = await initializeServer();
});

afterAll(async () => {
    await clearDatabase();
    await destroyServer();
});

describe('Test UserController', () => {
    let userCreated: UserModel;
    beforeAll(async () => {
        userCreated = await UserModel.create({
            email: 'iscluis@hotmail.com',
            name: 'luis fernando',
            surname: 'prudencio',
            secondSurname: 'cruz'
        });
    });

    it('It should success in post /users endpoint', async () => {
        const userRequest: User = {
            email: 'iscluisRequest@hotmail.com',
            name: 'luis fernando',
            surname: 'prudencio',
            secondSurname: 'cruz'
        }
        const response = await request(app).post('/users').send(userRequest);
        expect(response.status).toBe(200);
        expect(response.body.data).not.toBe(null);
        expect(response.body.data).toEqual({ id: 2, ...userRequest });

        await UserModel.destroy({ where: { id: response.body.data.id } });
    });

    it('It should success in delete /users/:id endpoint', async () => {
        const userRequest: User = {
            email: 'iscluisRequest@hotmail.com',
            name: 'luis fernando',
            surname: 'prudencio',
            secondSurname: 'cruz'
        }
        const newUserCreated = await UserModel.create(userRequest);
        const response = await request(app).delete(`/users/${newUserCreated.id}`);
        expect(response.status).toBe(200);
    });

    it('It should not found in put /users:/id endpoint', async () => {
        const response = await request(app).put('/users/-1').send({});
        expect(response.status).toBe(404);
    });

    it('It should internal server error in post /users endpoint', async () => {
        const userRequest: User = {
            email: 'iscluis@hotmail.com',
            name: 'luis fernando',
            surname: 'prudencio',
            secondSurname: 'cruz'
        }
        const response = await request(app).post('/users/').send(userRequest);
        expect(response.status).toBe(500);
    });

    it('It should success in put /users/:id endpoint', async () => {
        const userRequest: User = {
            email: 'iscluisRequest@hotmail.com',
            name: 'luis fernando',
            surname: 'prudencio',
            secondSurname: 'cruz'
        }
        const newUser = await UserModel.create(userRequest);
        const response = await request(app).put(`/users/${newUser.id}`).send({ ...userRequest, name: 'luis fernando actualizado' });
        expect(response.status).toBe(200);
        await UserModel.destroy({ where: { id: newUser.id } });
    });

    it('It should array in get /users endpoint', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(1);
        expect(response.body.data).toEqual([JSON.parse(JSON.stringify(userCreated))]);
    });

    it('It should 200 in get /users/:id endpoint', async () => {
        const response = await request(app).get('/users/1');
        expect(response.status).toBe(200);
        expect(response.body.data).not.toBe(null);
        expect(response.body.data).toEqual(JSON.parse(JSON.stringify(userCreated)));
    });
});