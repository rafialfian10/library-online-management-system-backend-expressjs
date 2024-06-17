const httpStatus = require("http-status");

const { getFine } = require("../../repositories/fineRepository");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const { singleFineResponse } = require("../../serializers/fineSerializer");

module.exports = async (req, res) => {
  try {
    const { data: fine, error } = await getFine(req.params.id);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    successResponse({
      response: res,
      status: httpStatus.OK,
      data: singleFineResponse(fine),
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
