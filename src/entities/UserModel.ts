import { Model, DataTypes } from 'sequelize';
import connection from '../utils/sequelize'

export class UserModel extends Model {
    id!: number;
    name!: string;
    surname!: string;
    secondSurname!: string;
    email!: string;
}

UserModel.init({
    id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    surname: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    secondSurname: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: true,
        unique: true
    },
}, {
    sequelize: connection,
    tableName: 'user',
    createdAt: false,
    updatedAt: false
});