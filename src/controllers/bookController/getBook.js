const httpStatus = require("http-status");

const { getBook } = require("../../repositories/bookRepository");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const { singleBookResponse } = require("../../serializers/bookSerializer");

module.exports = async (req, res) => {
  try {
    const { data: book, error } = await getBook(req.params.id);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    successResponse({
      response: res,
      status: httpStatus.OK,
      data: singleBookResponse(book),
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
