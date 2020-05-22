import { Response } from "express";
import { ResponseSuccess, ResponseError } from "../models/responses/Reponse";

export const success = (response: Response<any>, data?: any, message?: string) => {
    const resp: ResponseSuccess<any> = {
        status: 200,
        message: message || 'OK',
        data
    }
    return response.status(200).send(resp);
}

export const badRequestError = (response: Response<any>, errors?: any, message?: string) => {
    return buildResponseError(response, 400, message || 'BAD REQUEST', errors);
}

export const notFoundError = (response: Response<any>, message?: string) => {
    return buildResponseError(response, 404, message || 'NOT FOUND');
}

export const conflictError = (response: Response<any>, errors?: any, message?: string) => {
    return buildResponseError(response, 409, message || 'CONFLICT', errors);
}

export const serverError = (response: Response<any>, errors?: any, message?: string) => {
    return buildResponseError(response, 500, message || 'INTERNAL SERVER ERROR', errors);
}

const buildResponseError = (resp: Response<any>, status: number, message: string, errors?: any): Response<ResponseError<any>> => {
    return resp
        .status(status)
        .send({ status, message, errors });
}