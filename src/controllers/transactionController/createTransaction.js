const httpStatus = require("http-status");

const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const {
  validateCreateTransactionRequest,
} = require("../../serializers/transactionSerializer");
const {
  getTransaction,
  createTransaction,
} = require("../../repositories/transactionRepository");

module.exports = async (req, res) => {
  try {
    const currentDate = new Date();
    const returnDate = new Date(currentDate.getTime() + 60000);

    const newTransaction = {
      idBook: req.body.idBook,
      idUser: req.userData.id,
      transactionType: req.body.transactionType,
      totalBook: req.body.totalBook,
      loanDate: currentDate,
      returnDate: returnDate,
      loanMaximum: returnDate,
      isStatus: true,
    };

    const error = validateCreateTransactionRequest(newTransaction);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    // create transaction
    const { data: transactionData, error: errorCreateNewTransaction } =
      await createTransaction(newTransaction);
    if (errorCreateNewTransaction) {
      const error = new Error(errorCreateNewTransaction);
      error.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw error;
    }

    const { data: transaction, error: errorGetTransaction } =
      await getTransaction(transactionData.id);

    if (errorGetTransaction) {
      const errors = new Error(errorGetTransaction);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    successResponse({
      response: res,
      message: "Transaction successfully (book successfully borrowed)",
      status: httpStatus.CREATED,
      data: transaction,
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
