interface Response {
    status: number;
    message: string;
}
export interface ResponseSuccess<T> extends Response {
    data: T
}

export interface ResponseError<T> {
    errors?: T
}