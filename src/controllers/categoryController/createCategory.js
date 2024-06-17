const httpStatus = require("http-status");

const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const {
  validateCreateCategoryRequest,
} = require("../../serializers/categorySerializer");
const {
  getCategory,
  createCategory,
} = require("../../repositories/categoryRepository");

module.exports = async (req, res) => {
  try {
    const newCategory = {
      category: req.body.category,
    };

    const error = validateCreateCategoryRequest(newCategory);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    // create category
    const { data: categoryData, error: errorCreateNewCategory } =
      await createCategory(newCategory);
    if (errorCreateNewCategory) {
      const error = new Error(errorCreateNewCategory);
      error.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw error;
    }

    const { data: category, error: errorGetCategory } = await getCategory(
      categoryData.id
    );

    if (errorGetCategory) {
      const errors = new Error(errorGetCategory);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    successResponse({
      response: res,
      message: "Category successfully created",
      status: httpStatus.CREATED,
      data: category,
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
