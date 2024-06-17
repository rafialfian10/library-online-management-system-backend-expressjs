"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categories.belongsToMany(models.Books, {
        as: "books",
        through: {
          model: "BookCategories",
          as: "bridge",
        },
        foreignKey: "idCategory",
      });
    }
  }
  Categories.init(
    {
      category: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Categories",
      paranoid: true,
      underscored: true,
    }
  );
  return Categories;
};
