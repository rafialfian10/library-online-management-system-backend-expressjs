const httpStatus = require("http-status");

const { BookCategories } = require("../../../database/models");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const {
  validateCreateBookRequest,
} = require("../../serializers/bookSerializer");
const { getBook, createBook } = require("../../repositories/bookRepository");
const {
  imageUrlGenerator,
  fileUrlGenerator,
} = require("../../pkg/helpers/fileUrlGenerator");

module.exports = async (req, res) => {
  try {
    let { categoryId } = req.body;
    categoryId =
      (typeof categoryId === "string" ? JSON.parse(categoryId) : categoryId) ||
      [];
    categoryId = categoryId.filter(Number.isInteger);

    const newBook = {
      title: req.body.title,
      publicationDate: req.body.publicationDate,
      isbn: req.body.isbn,
      pages: req.body.pages,
      author: req.body.author,
      description: req.body.description,
      image: imageUrlGenerator(req, req.files["image"][0].filename),
      file: fileUrlGenerator(req, req.files["file"][0].filename),
      qty: req.body.qty,
    };

    const error = validateCreateBookRequest(newBook);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    // create book
    const { data: bookData, error: errorCreateNewBook } = await createBook(
      newBook
    );
    if (errorCreateNewBook) {
      const error = new Error(errorCreateNewBook);
      error.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw error;
    }

    if (categoryId.length > 0) {
      const bookCategoryData = categoryId
        .map((item) => {
          const categoryIdInt = parseInt(item);
          if (!isNaN(categoryIdInt)) {
            return { idBook: bookData.id, idCategory: categoryIdInt };
          } else {
            console.error(`Invalid categoryId: ${item}`);
            return null;
          }
        })
        .filter((item) => item !== null);

      await BookCategories.bulkCreate(bookCategoryData);
    }

    const { data: book, error: errorGetBook } = await getBook(bookData.id);
    if (errorGetBook) {
      const errors = new Error(errorGetBook);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    successResponse({
      response: res,
      message: "Book successfully created",
      status: httpStatus.CREATED,
      data: book,
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
