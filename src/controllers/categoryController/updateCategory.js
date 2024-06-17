const httpStatus = require("http-status");

const {
  getCategory,
  updateCategory,
} = require("../../repositories/categoryRepository");
const {
  validateUpdateCategoryRequest,
  singleCategoryResponse,
} = require("../../serializers/categorySerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");

module.exports = async (req, res) => {
  try {
    const error = validateUpdateCategoryRequest(req.body);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    const { data: category, error: errorFindCategory } = await getCategory(
      req.params.id
    );
    if (errorFindCategory) {
      const errors = new Error(errorFindCategory);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    // update category
    if (
      req.body.category !== null &&
      req.body.category !== undefined &&
      req.body.category !== category.category
    ) {
      category.category = req.body.category;
    }

    const { error: errorOnUpdateteCategory } = await updateCategory(category);
    if (errorOnUpdateteCategory) {
      const errors = new Error(errorOnUpdateteCategory);
      errors.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw errors;
    }

    const { data: categoryUpdated, errorGetCategory } = await getCategory(
      category.id
    );
    if (errorGetCategory) {
      const errors = new Error(errorGetCategory);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    successResponse({
      response: res,
      message: "Category successfully updated",
      status: httpStatus.OK,
      data: singleCategoryResponse(categoryUpdated),
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
