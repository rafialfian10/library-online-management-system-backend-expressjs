const httpStatus = require("http-status");
const midtransClient = require("midtrans-client");

const { getUser } = require("../../repositories/userRepository");
const { getFine, updateFine } = require("../../repositories/fineRepository");
const {
  validateUpdateFineRequest,
  singleFineResponse,
} = require("../../serializers/fineSerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");

// Configurate midtrans client with CoreApi
const MIDTRANS_CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY;
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY;

const core = new midtransClient.CoreApi();

core.apiConfig.set({
  isProduction: false,
  serverKey: MIDTRANS_SERVER_KEY,
  clientKey: MIDTRANS_CLIENT_KEY,
});

async function generateUniqueId() {
  let FineIsMatch = false;
  let fineId;
  while (!FineIsMatch) {
    fineId = Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000);
    const { data: fine } = await getFine(fineId);
    if (!fine) {
      FineIsMatch = true;
    }
  }
  return fineId;
}

module.exports = async (req, res) => {
  try {
    const idOrder = await generateUniqueId();

    const fineUpdateData = {
      id: parseInt(req.body.idBook + Math.random().toString().slice(3, 8)),
      ...req.body, 
      idBook: req.body.idBook,
      idUser: req.userData.id,
      totalDay: req.body.totalDay,
      totalFine: req.body.totalFine,
      status: "pending",
      idOrder: idOrder,
    };

    const error = validateUpdateFineRequest(fineUpdateData);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    const { data: fine, error: errorFindFine } = await getFine(req.params.id);
    if (errorFindFine) {
      const errors = new Error(errorFindFine);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    const { data: user, error: errorFindUser } = await getUser(req.userData.id);
    if (errorFindUser) {
      const errors = new Error(errorFindUser);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    if (req.body.idBook !== undefined && req.body.idBook !== fine.idBook) {
      fine.idBook = req.body.idBook;
    }

    if (
      req.body.totalDay !== undefined &&
      req.body.totalDay !== fine.totalDay
    ) {
      fine.totalDay = req.body.totalDay;
    }

    if (
      req.body.totalFine !== undefined &&
      req.body.totalFine !== fine.totalFine
    ) {
      fine.totalFine = req.body.totalFine;
    }

    if (
      req.body.status !== undefined &&
      req.body.status !== fine.status
    ) {
      fine.status = req.body.status;
    }

    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id: fineUpdateData.idOrder,
        gross_amount: fine.totalFine,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        username: user?.username,
        email: user?.email,
        phone: user?.phone,
      },
    };

    const payment = await snap.createTransaction(parameter);
    fine.token = payment.token;
    fine.idOrder = fineUpdateData.idOrder;

    const { error: errorOnUpdateFine } = await updateFine(fine);
    if (errorOnUpdateFine) {
      const errors = new Error(errorOnUpdateFine);
      errors.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw errors;
    }

    const { data: fineUpdated, error: errorGetFine } = await getFine(fine.id);
    if (errorGetFine) {
      const errors = new Error(errorGetFine);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    successResponse({
      response: res,
      message: "Fine successfully paid",
      status: httpStatus.OK,
      data: {
        ...singleFineResponse(fineUpdated),
        payment: payment,
      },
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
