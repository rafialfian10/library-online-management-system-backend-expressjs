const httpStatus = require("http-status");

const { BookCategories } = require("../../../database/models");
const { getBook, updateBook } = require("../../repositories/bookRepository");
const {
  validateUpdateBookRequest,
  singleBookResponse,
} = require("../../serializers/bookSerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const {
  fileUrlGenerator,
  imageUrlGenerator,
} = require("../../pkg/helpers/fileUrlGenerator");

module.exports = async (req, res) => {
  try {
    let { categoryId } = req.body;
    categoryId =
      (typeof categoryId === "string" ? JSON.parse(categoryId) : categoryId) ||
      [];
    categoryId = categoryId.filter(Number.isInteger);

    const error = validateUpdateBookRequest(req.body);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    const { data: book, error: errorFindBook } = await getBook(req.params.id);
    if (errorFindBook) {
      const errors = new Error(errorFindBook);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    // update book
    if (req.body.title !== undefined && req.body.title !== book.title) {
      book.title = req.body.title;
    }

    if (
      req.body.publicationDate !== undefined &&
      req.body.publicationDate !== book.publicationDate
    ) {
      book.publicationDate = req.body.publicationDate;
    }

    if (req.body.isbn !== undefined && req.body.isbn !== book.isbn) {
      book.isbn = req.body.isbn;
    }

    if (req.body.pages !== undefined && req.body.pages !== book.pages) {
      book.pages = req.body.pages;
    }

    if (req.body.author !== undefined && req.body.author !== book.author) {
      book.author = req.body.author;
    }

    if (
      req.body.description !== undefined &&
      req.body.description !== book.description
    ) {
      book.description = req.body.description;
    }

    if (req.files && req.files["image"]) {
      book.image = imageUrlGenerator(req, req.files["image"][0].filename);
    }

    if (req.files && req.files["file"]) {
      book.file = fileUrlGenerator(req, req.files["file"][0].filename);
    }

    if (req.body.qty !== undefined && req.body.qty !== book.qty) {
      book.qty = req.body.qty;
    }

    await BookCategories.destroy({
      where: {
        idBook: req.params.id,
      },
    });

    let bookCategoryData = [];
    if (categoryId.length > 0) {
      bookCategoryData = categoryId
        .map((item) => {
          const categoryIdInt = parseInt(item);
          if (!isNaN(categoryIdInt)) {
            return {
              idBook: parseInt(req.params.id),
              idCategory: categoryIdInt,
            };
          } else {
            console.error(`Invalid categoryId: ${item}`);
            return null;
          }
        })
        .filter((item) => item !== null);
    }

    if (bookCategoryData.length > 0) {
      await BookCategories.bulkCreate(bookCategoryData);
    }

    const { error: errorOnUpdateteBook } = await updateBook(book);
    if (errorOnUpdateteBook) {
      const errors = new Error(errorOnUpdateteBook);
      errors.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw errors;
    }

    const { data: bookUpdated, errorGetBook } = await getBook(book.id);
    if (errorGetBook) {
      const errors = new Error(errorGetBook);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    successResponse({
      response: res,
      message: "Book successfully updated",
      status: httpStatus.OK,
      data: singleBookResponse(bookUpdated),
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
