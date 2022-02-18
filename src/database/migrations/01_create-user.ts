import { DataTypes, QueryInterface } from 'sequelize';
import { MigrationFunctionParams } from './migrationTypes';

async function up({ context: queryInterface }: MigrationFunctionParams) {
  await queryInterface.createTable('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
  });
}

async function down({ context: queryInterface }: MigrationFunctionParams) {
  await queryInterface.dropTable('users');
}

export { up, down };
