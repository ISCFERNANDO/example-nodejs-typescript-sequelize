import { Sequelize, Options } from 'sequelize';

const ENV = process.env;

const config: Options = {
    database: ENV.DB_NAME,
    host: ENV.DB_HOST,
    username: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    dialect: 'mysql',
    logging: true,
}
export default new Sequelize(config);