import { DataTypes } from 'sequelize';
import { MigrationFunctionParams } from './../types';

async function up({ context: queryInterface }: MigrationFunctionParams) {
  await queryInterface.addColumn('User', 'email', {
    type: DataTypes.STRING,
    allowNull: false,
  });
}

async function down({ context: queryInterface }: MigrationFunctionParams) {
  await queryInterface.removeColumn('User', 'email');
}

export { up, down };
