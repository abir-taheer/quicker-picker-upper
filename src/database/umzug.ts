import sequelize from './sequelize';
import { Umzug, SequelizeStorage } from 'umzug';

require('ts-node/register');

// Umzug is responsible for running Migrations
const umzug = new Umzug({
  migrations: { glob: 'migrations/*.ts' },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

export default umzug;
