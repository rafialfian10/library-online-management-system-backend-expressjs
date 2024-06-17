const { Books, BookCategories, Categories } = require("../../database/models");
// ---------------------------------------------------------

exports.getBooks = async (offset = 0, limit = 10, filter = {}) => {
  const response = { data: null, error: null, count: 0 };

  try {
    response.data = await Books.findAll({
      offset: offset,
      limit: limit,
      where: filter,
      include: [
        {
          model: Categories,
          as: "categories",
          through: {
            model: BookCategories,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });

    if (!response.data) {
      throw new Error("books data not found");
    }

    response.count = await Books.count({
      where: filter,
    });
  } catch (error) {
    response.error = `error on get datas : ${error.message}`;
  }

  return response;
};

exports.getBook = async (bookId) => {
  const response = { data: null, error: null };

  try {
    response.data = await Books.findOne({
      where: {
        id: bookId,
      },
      include: [
        {
          model: Categories,
          as: "categories",
          through: {
            model: BookCategories,
            as: "bridge",
            attributes: [],
          },
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt"],
          },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });

    if (!response.data) {
      throw new Error(`book not found`);
    }
  } catch (error) {
    response.error = `error on get data : ${error.message}`;
  }

  return response;
};

exports.createBook = async (book) => {
  const response = { data: null, error: null };

  try {
    response.data = await Books.create({
      title: book.title,
      publicationDate: book.publicationDate,
      isbn: book.isbn,
      pages: book.pages,
      author: book.author,
      description: book.description,
      image: book.image,
      file: book.file,
      qty: book.qty,
    });
  } catch (error) {
    response.error = `error on create data : ${error.message}`;
  }

  return response;
};

exports.updateBook = async (book) => {
  const response = { data: null, error: null };

  try {
    response.data = await book.save();
  } catch (error) {
    response.error = `error on update data : ${error.message}`;
  }

  return response;
};

exports.deleteBook = async (book) => {
  const response = { data: null, error: null };

  try {
    response.data = await book.destroy();
  } catch (error) {
    response.error = `error on delete data : ${error.message}`;
  }

  return response;
};
