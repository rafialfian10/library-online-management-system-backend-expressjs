const joi = require("joi");

const { Transactions } = require("../../database/models");

exports.singleTransactionResponse = (transactionData) => {
  const transaction =
    transactionData instanceof Transactions
      ? transactionData.get({ plain: true })
      : transactionData;

  return {
    id: transaction.id,
    idUser: transaction.idUser,
    user: transaction.user,
    idBook: transaction.idBook,
    book: transaction.book,
    transactionType: transaction.transactionType,
    totalBook: transaction.totalBook,
    loanDate: transaction.loanDate,
    returnDate: transaction.returnDate,
    isStatus: transaction.isStatus,
  };
};

exports.multipleTransactionResponse = (transactionsData) => {
  return transactionsData.map((el) => {
    return this.singleTransactionResponse(el);
  });
};

exports.validateCreateTransactionRequest = (transactionData) => {
  const schema = joi.object({
    idBook: joi.number().required(),
    idUser: joi.string().required(),
    transactionType: joi.string().required(),
    totalBook: joi.number().required(),
    loanDate: joi.date().iso().required(),
    returnDate: joi.date().iso().required(),
    isStatus: joi.boolean().required(),
  });

  try {
    const { error } = schema.validate(transactionData, { allowUnknown: true });
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};

exports.validateUpdateTransactionRequest = (transactionData) => {
  const schema = joi.object({
    idBook: joi.number().required(),
    idUser: joi.string().required(),
    isStatus: joi.boolean().required(),
  });

  try {
    const { error } = schema.validate(transactionData, { allowUnknown: true });
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};
