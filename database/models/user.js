"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Roles, {
        foreignKey: "roleId",
        as: "role",
      });

      //hasMany to book model
      // Users.hasMany(models.Books, {
      //   as: "books",
      //   foreignKey: {
      //     name: "idUser",
      //   },
      // });

      //hasMany association to transaction model
      Users.hasMany(models.Transactions, {
        as: "userTransactions",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      isEmailVerified: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      phone: {
        type: DataTypes.STRING,
        unique: true,
      },
      gender: DataTypes.STRING,
      address: DataTypes.TEXT,
      photo: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Users",
      underscored: true,
      paranoid: true,
    }
  );
  return Users;
};
