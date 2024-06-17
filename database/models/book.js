"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // product.hasMany(models.transaction, {
      //   as: "transactions",
      //   foreignKey: {
      //     name: "idProduct",
      //   },
      // });

      // belongs to many category
      Books.belongsToMany(models.Categories, {
        as: "categories",
        through: {
          model: "BookCategories",
          as: "bridge",
        },
        foreignKey: "idBook",
      });
    }
  }
  Books.init(
    {
      title: DataTypes.STRING,
      publicationDate: DataTypes.DATE,
      isbn: DataTypes.STRING,
      pages: DataTypes.INTEGER,
      author : DataTypes.STRING,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      file: DataTypes.STRING,
      qty: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Books",
      underscored: true,
      paranoid: true,
    }
  );
  return Books;
};
