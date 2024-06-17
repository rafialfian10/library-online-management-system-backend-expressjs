const httpStatus = require("http-status");

const { getFine, deleteFine } = require("../../repositories/fineRepository");
const { singleFineResponse } = require("../../serializers/fineSerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");

module.exports = async (req, res) => {
  try {
    const { data: fine, error } = await getFine(req.params.id);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    const { data: fineDeleted, error: errorOnDeleteFine } = await deleteFine(
      fine
    );
    if (errorOnDeleteFine) {
      const errors = new Error(errorOnDeleteFine);
      errors.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw errors;
    }

    successResponse({
      response: res,
      message: "Fine successfully deleted",
      status: httpStatus.OK,
      data: singleFineResponse(fineDeleted),
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
