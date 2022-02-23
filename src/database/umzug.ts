import { SequelizeStorage, Umzug } from 'umzug';
import sequelize from './sequelize';
import path from 'path';

require('ts-node/register');

const migrationsPath = path.resolve(__dirname, 'migrations');

// Umzug is responsible for running Migrations
const umzug = new Umzug({
  migrations: {
    glob: migrationsPath + '/*.js',
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export default umzug;
