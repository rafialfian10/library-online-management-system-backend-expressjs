const { Op } = require("sequelize");

const { Categories } = require("../../database/models");
// ---------------------------------------------------------

exports.getCategories = async (offset = 0, limit = 10, filter = {}) => {
  const response = { data: null, error: null, count: 0 };

  try {
    response.data = await Categories.findAll({
      offset: offset,
      limit: limit,
      where: filter,
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
      order: [['id', 'DESC']], 
    });

    if (!response.data) {
      throw new Error("categories data not found");
    }

    response.count = await Categories.count({
      where: filter,
    });
  } catch (error) {
    response.error = `error on get datas : ${error.message}`;
  }

  return response;
};

exports.getCategory = async (categoryId) => {
  const response = { data: null, error: null };

  try {
    response.data = await Categories.findOne({
      where: {
        id: categoryId,
      },
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });

    if (!response.data) {
      throw new Error(`category not found`);
    }
  } catch (error) {
    response.error = `error on get data : ${error.message}`;
  }

  return response;
};

exports.createCategory = async (category) => {
  const response = { data: null, error: null };

  try {
    response.data = await Categories.create({
      category: category.category,
    });
  } catch (error) {
    response.error = `error on create data : ${error.message}`;
  }

  return response;
};

exports.updateCategory = async (category) => {
  const response = { data: null, error: null };

  try {
    response.data = await category.save();
  } catch (error) {
    response.error = `error on update data : ${error.message}`;
  }

  return response;
};

exports.deleteCategory = async (category) => {
  const response = { data: null, error: null };

  try {
    response.data = await category.destroy();
  } catch (error) {
    response.error = `error on delete data : ${error.message}`;
  }

  return response;
};
