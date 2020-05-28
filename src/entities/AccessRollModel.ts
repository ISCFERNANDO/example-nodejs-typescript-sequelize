import { AccessModel } from './AccessModel';
import { RollModel } from './RollModel';
import { StatusRegister } from './../enums/StatusRegister';
import { Model, DataTypes, Sequelize } from 'sequelize';
import connection from '../utils/sequelize';


export class AccessRollModel extends Model {
    roll_id!: number;
    access_id!: number;
    access_type!: number;
    estatus: StatusRegister = StatusRegister.ACTIVE;
    created_at!: string;
    updated_at!: string;
}

AccessRollModel.init({
    roll_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: RollModel,
            key: 'id',
        },
    },
    access_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: AccessModel,
            key: 'id'
        },
    },
    access_type: {
        type: DataTypes.SMALLINT,
        allowNull: false
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

AccessModel.belongsToMany(RollModel, {
    through: AccessRollModel,
    foreignKey: 'access_id',
});
RollModel.belongsToMany(AccessModel, {
    through: AccessRollModel,
    foreignKey: 'roll_id',
})