const httpStatus = require("http-status");

const { getBook } = require("../../repositories/bookRepository");
const { singleBookResponse } = require("../../serializers/bookSerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");

module.exports = async (req, res) => {
  try {
    const { data: book, error } = await getBook(req.params.id);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    if (book.image) {
      book.image = null;
      await book.save();
    }

    successResponse({
      response: res,
      message: "Image book successfully deleted",
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