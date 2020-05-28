import { AccessModel } from './AccessModel';
import { StatusRegister } from './../enums/StatusRegister';
import { Model, DataTypes, Sequelize, HasManyGetAssociationsMixin, Association, HasManyAddAssociationMixin, HasManyHasAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize';
import connection from '../utils/sequelize';


export class RollModel extends Model {
    id!: number;
    name!: string;
    estatus: StatusRegister = StatusRegister.ACTIVE;
    created_at!: string;
    updated_at!: string;

    public getAccess!: HasManyGetAssociationsMixin<AccessModel>;
    public addAccess!: HasManyAddAssociationMixin<AccessModel, number>;
    public hasAccess!: HasManyHasAssociationMixin<AccessModel, number>;
    public countAccess!: HasManyCountAssociationsMixin;
    public createAccess!: HasManyCreateAssociationMixin<AccessModel>;

    public readonly access?: AccessModel[];
    public static associations: {
        access: Association<RollModel, AccessModel>;
    }
}

RollModel.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
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
    tableName: 'rol',
});