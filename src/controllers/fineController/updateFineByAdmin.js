const httpStatus = require("http-status");

const { getFine, updateFine } = require("../../repositories/fineRepository");
const {
  validateUpdateFineAdminRequest,
  singleFineResponse,
} = require("../../serializers/fineSerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");

module.exports = async (req, res) => {
  try {
    const fineUpdateData = {
      idBook: req.body.idBook,
      idUser: req.userData.id,
      status: req.body.status,
    };

    const error = validateUpdateFineAdminRequest(fineUpdateData);
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

    if (req.body.idBook !== undefined && req.body.idBook !== fine.idBook) {
      fine.idBook = req.body.idBook;
    }

    if (req.body.status !== undefined && req.body.status !== fine.status) {
      fine.status = req.body.status;
    }

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
      message: "Fine successfully updated",
      status: httpStatus.OK,
      data: singleFineResponse(fineUpdated),
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
