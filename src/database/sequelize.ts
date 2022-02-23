import path from 'path';
import { Options, Sequelize } from 'sequelize';

const sqlitePath = path.resolve(__dirname, './../../app.db');
const logsDisabled = process.env.SEQUELIZE_NO_LOG === 'true';

const sequelize_url: string = process.env.SEQUELIZE_URL;

const url: string = sequelize_url || `sqlite::${sqlitePath}`;

const env: string = process.env.NODE_ENV || 'development';

const configMap: { [key: string]: Options } = {
  development: {
    dialect: sequelize_url ? undefined : 'sqlite',
    storage: sequelize_url ? undefined : 'app.db',
    define: {
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    },
    ssl: true,
    native: true,
    logging: logsDisabled ? false : console.log,
  },
  production: {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      charset: 'utf8',
      collate: 'utf8_unicode_ci',
    },
    native: true,
    ssl: true,
    logging: false,
  },
};

const config = configMap[env];

const sequelize = new Sequelize(url, config);

export default sequelize;
