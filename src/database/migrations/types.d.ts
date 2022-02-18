import { QueryInterface } from 'sequelize';

export type MigrationFunctionParams = {
  context: QueryInterface;
};
