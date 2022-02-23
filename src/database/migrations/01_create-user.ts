import { DataTypes } from 'sequelize';
import { MigrationFunctionParams } from './../types';

async function up({ context: queryInterface }: MigrationFunctionParams) {
  await queryInterface.createTable('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
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
      allowNull: true,
    },
  });
}

async function down({ context: queryInterface }: MigrationFunctionParams) {
  await queryInterface.dropTable('User');
}

export { up, down };
