const joi = require("joi");

const { Categories } = require("../../database/models");

exports.singleCategoryResponse = (categoryData) => {
  const category =
    categoryData instanceof Categories ? categoryData.get({ plain: true }) : categoryData;

  return {
    id: category.id,
    category: category.category,
  };
};

exports.multipleCategoryResponse = (categoriesData) => {
  return categoriesData.map((el) => {
    return this.singleCategoryResponse(el);
  });
};

exports.validateCreateCategoryRequest = (categoryData) => {
  const schema = joi.object({
    category: joi.string().required(),
  });

  try {
    const { error } = schema.validate(categoryData, { allowUnknown: true });
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};

exports.validateUpdateCategoryRequest = (categoryData) => {
  const schema = joi.object({
    category: joi.string(),
  });

  try {
    const { error } = schema.validate(categoryData, { allowUnknown: true });
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};
