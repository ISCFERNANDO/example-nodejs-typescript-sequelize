import { StatusRegister } from './../enums/StatusRegister';
import { Model, DataTypes, Sequelize } from 'sequelize';
import connection from '../utils/sequelize';


export class AccessModel extends Model {
    id!: number;
    name!: string;
    estatus: StatusRegister = StatusRegister.ACTIVE;
    created_at!: string;
    updated_at!: string;
}

AccessModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true
    },
    estatus: {
        type: DataTypes.SMALLINT,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    sequelize: connection,
    tableName: 'access',
});