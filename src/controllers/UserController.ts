import { User } from './../models/requests/User';
import { Response, Request } from "express";
import * as responseHandler from '../handlers/ResponseHandler';
import * as UserProvider from '../services/db/UserProvider';

export const getListOfUsers = async (request: Request, response: Response<any>) => {
    let listOfUsers: User[] = [];
    try {
        listOfUsers = await UserProvider.findAll();
    } catch (err) {
        return responseHandler.serverError(response);
    }
    responseHandler.success(response, listOfUsers);
}

export const getDetails = async (request: Request<any>, response: Response<any>) => {
    const { userId } = request.params;
    let userDetail: User | null;
    try {
        userDetail = await UserProvider.findById(userId);
    } catch (err) {
        return responseHandler.serverError(response);
    }
    if (!userDetail) {
        return responseHandler.notFoundError(response, 'Usuario no encontrado');
    }
    responseHandler.success(response, userDetail);
}

export const addUser = async (request: Request<any>, response: Response<any>) => {
    let userRequest: User = request.body;
    try {
        userRequest = await UserProvider.createUser(userRequest);
    } catch (err) {
        return responseHandler.serverError(response);
    }
    responseHandler.success(response, userRequest);
}

export const updateUser = async (request: Request<any>, response: Response<any>) => {
    const { userId } = request.params;
    const userRequest: User = request.body;

    try {
        const userDetail = await UserProvider.findById(userId);
        if (!userDetail) {
            return responseHandler.notFoundError(response, 'Usuario no encontrado');
        }
        await UserProvider.updateUser(userRequest, userId);
    } catch (err) {
        return responseHandler.serverError(response);
    }
    responseHandler.success(response, { id: userId, ...userRequest });
}

export const deleteUser = async (request: Request<any>, response: Response<any>) => {
    const { userId } = request.params;
    try {
        await UserProvider.deleteUser(userId);
    } catch (err) {
        return responseHandler.serverError(response);
    }
    responseHandler.success(response, null, 'El usuario se eliminó con éxito');
}