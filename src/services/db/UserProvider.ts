import { User } from './../../models/requests/User';
import { UserModel } from './../../entities/UserModel';

export const findAll = (): Promise<User[]> => {
    return UserModel.findAll();
}

export const findById = (id: number): Promise<User | null> => {
    return UserModel.findOne({ where: { id } });
}

export const createUser = (user: User): Promise<User> => {
    return UserModel.create(user);
}

export const updateUser = (user: User, id: number): Promise<any> => {
    return UserModel.update(user, { where: { id } });
}

export const deleteUser = (id: number): Promise<number> => {
    return UserModel.destroy({ where: { id } });
}