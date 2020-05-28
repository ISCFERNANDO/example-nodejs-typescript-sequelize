import { Sequelize, Options } from 'sequelize';

const ENV = process.env;

let config: Options;
if (ENV.NODE_ENV === 'test') {
    config = {
        dialect: 'sqlite',
        storage: 'sqlite::memory',
        logging: false,
    }
} else {
    config = {
        port: ENV.DB_PORT ? parseInt(ENV.DB_PORT) : 3306,
        database: ENV.DB_NAME,
        host: ENV.DB_HOST,
        username: ENV.DB_USER,
        password: ENV.DB_PASSWORD,
        dialect: 'mysql',
        logging: false,
        define: {
            timestamps: false,
        },
    }
}

export default new Sequelize(config);