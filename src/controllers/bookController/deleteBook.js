const httpStatus = require("http-status");

const { BookCategories } = require("../../../database/models");
const { getBook, deleteBook } = require("../../repositories/bookRepository");
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

    await BookCategories.destroy({
      where: {
        idBook: req.params.id,
      },
    });

    const { data: bookDeleted, error: errorOnDeleteBook } = await deleteBook(
      book
    );
    if (errorOnDeleteBook) {
      const errors = new Error(errorOnDeleteBook);
      errors.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw errors;
    }

    successResponse({
      response: res,
      message: "Book successfully deleted",
      status: httpStatus.OK,
      data: singleBookResponse(bookDeleted),
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
