const httpStatus = require("http-status");

const {
  getCategory,
  deleteCategory,
} = require("../../repositories/categoryRepository");
const {
  singleCategoryResponse,
} = require("../../serializers/categorySerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");

module.exports = async (req, res) => {
  try {
    const { data: category, error } = await getCategory(req.params.id);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    const { data: categoryDeleted, error: errorOnDeleteCategory } =
      await deleteCategory(category);
    if (errorOnDeleteCategory) {
      const errors = new Error(errorOnDeleteCategory);
      errors.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw errors;
    }

    successResponse({
      response: res,
      message: "Category successfully deleted",
      status: httpStatus.OK,
      data: singleCategoryResponse(categoryDeleted),
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
