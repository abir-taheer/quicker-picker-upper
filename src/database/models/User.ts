import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import sequelize from '../sequelize';

export default class User extends Model<
  InferAttributes<User, {}>,
  InferCreationAttributes<User, {}>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string;
  declare email: string;

  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;
  // deletedAt is only defined after the row is soft-deleted
  declare deletedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    lastName: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'User',
    sequelize,
    paranoid: true,
  }
);
