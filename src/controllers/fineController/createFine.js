const httpStatus = require("http-status");

const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const {
  validateCreateFineRequest,
} = require("../../serializers/fineSerializer");
const { getFine, createFine } = require("../../repositories/fineRepository");

module.exports = async (req, res) => {
  try {
    const newFine = {
      idBook: req.body.idBook,
      idUser: req.userData.id,
      totalDay: req.body.totalDay,
      totalFine: req.body.totalFine,
    };

    const error = validateCreateFineRequest(newFine);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    const { data: fineData, error: errorCreateNewFine } = await createFine(
      newFine
    );
    if (errorCreateNewFine) {
      const error = new Error(errorCreateNewFine);
      error.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw error;
    }

    const { data: fine, error: errorGetFine } = await getFine(
      fineData.id
    );

    if (errorGetFine) {
      const errors = new Error(errorGetFine);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    successResponse({
      response: res,
      message: "Fine successfully created",
      status: httpStatus.CREATED,
      data: fine,
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
