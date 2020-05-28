import { RollModel } from './RollModel';
import { StatusRegister } from './../enums/StatusRegister';
import { Model, DataTypes, Sequelize, HasOneGetAssociationMixin, Association } from 'sequelize';
import connection from '../utils/sequelize'

export class UserModel extends Model {
    id!: number;
    roll_id!: number;
    name!: string;
    surname!: string;
    secondSurname!: string;
    email!: string;
    estatus: StatusRegister = StatusRegister.ACTIVE;
    created_at!: string;
    updated_at!: string;

    public getRoll!: HasOneGetAssociationMixin<RollModel>;

    public readonly roll?: RollModel;
    public static associations: {
        roll: Association<UserModel, RollModel>;
    }
}

UserModel.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    roll_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
            model: RollModel,
            key: 'id',
        }
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    secondSurname: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true
    },
    estatus: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize: connection,
    tableName: 'user',
});

UserModel.belongsTo(RollModel, { foreignKey: 'roll_id' });