const joi = require("joi");

const { Books } = require("../../database/models");

exports.singleBookResponse = (bookData) => {
  const book =
    bookData instanceof Books ? bookData.get({ plain: true }) : bookData;

  return {
    id: book.id,
    title: book.title,
    publicationDate: book.publicationDate,
    isbn: book.isbn,
    pages: book.pages,
    author: book.author,
    description: book.description,
    image: book.image,
    file: book.file,
    qty: book.qty,
    categories: book.categories,
  };
};

exports.multipleBookResponse = (booksData) => {
  return booksData.map((el) => {
    return this.singleBookResponse(el);
  });
};

exports.validateCreateBookRequest = (bookData) => {
  const schema = joi.object({
    title: joi.string().required(),
    publicationDate: joi.date().required(),
    isbn: joi.string().required(),
    pages: joi.number().required(),
    author: joi.string().required(),
    description: joi.string().required(),
    qty: joi.number().required(),
  });

  try {
    const { error } = schema.validate(bookData, { allowUnknown: true });
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};

exports.validateUpdateBookRequest = (bookData) => {
  const schema = joi.object({
    title: joi.string().required(),
    publicationDate: joi.date().required(),
    isbn: joi.string().required(),
    pages: joi.number().required(),
    author: joi.string().required(),
    description: joi.string().required(),
    qty: joi.number().required(),
  });

  try {
    const { error } = schema.validate(bookData, { allowUnknown: true });
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};
