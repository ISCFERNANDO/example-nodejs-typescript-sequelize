import { User } from './../../src/models/requests/User';

import * as UserProvider from '../../src/services/db/UserProvider';

describe('Test UserProvider', () => {
    it('It should array empty in findAll function', async () => {
        const expectFindAll: Promise<User[]> = new Promise((resolve, reject) => resolve([]));

        const spy = jest.fn(() => expectFindAll);
        jest.spyOn(UserProvider, 'findAll')
            .mockImplementation(() => spy());

        const listOfUsers = await UserProvider.findAll();
        expect(Array.isArray(listOfUsers)).toBe(true);
        expect(listOfUsers.length).toBe(0);
    });

    it('It should array not empty in findAll function', async () => {
        const listOfUsersExpect: User[] = [{
            id: 1,
            email: 'iscluis@hotmail.com',
            name: 'luis fernando',
            surname: 'prudencio',
            secondSurname: 'cruz'
        }];
        const expectFindAll: Promise<User[]> = new Promise((resolve, reject) => resolve(listOfUsersExpect));

        const spy = jest.fn(() => expectFindAll);
        jest.spyOn(UserProvider, 'findAll')
            .mockImplementation(() => spy());

        const listOfUsers = await UserProvider.findAll();
        expect(Array.isArray(listOfUsers)).toBe(true);
        expect(listOfUsers.length).toBe(1);
        expect(listOfUsers).toEqual(listOfUsersExpect);
    });

    it('It should created in create function', async () => {
        const user = {
            email: 'iscluis@hotmail.com',
            name: 'luis fernando',
            surname: 'prudencio',
            secondSurname: 'cruz'
        }
        const userCreated: Promise<User> = new Promise((resolve) => {
            resolve({ id: 1, ...user, });
        });

        const spy = jest.fn(() => userCreated);
        jest.spyOn(UserProvider, 'createUser')
            .mockImplementation(() => spy());

        const userResp = await UserProvider.createUser(user);
        expect({ id: 1, ...user }).toEqual(userResp);
    });

    it('It should user in findById function', async () => {
        const user = {
            email: 'iscluis@hotmail.com',
            name: 'luis fernando',
            surname: 'prudencio',
            secondSurname: 'cruz'
        }
        const userObtained: Promise<User> = new Promise((resolve) => {
            resolve({ id: 1, ...user, });
        });

        const spy = jest.fn(() => userObtained);
        jest.spyOn(UserProvider, 'findById')
            .mockImplementation(() => spy());

        const userResp = await UserProvider.findById(1);
        expect({ id: 1, ...user }).toEqual(userResp);
    });
});