const httpStatus = require("http-status");

const { getFinesByUser } = require("../../repositories/fineRepository");
const { multipleFineResponse } = require("../../serializers/fineSerializer");
const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");

module.exports = async (req, res) => {
  try {
    let offset, limit;

    if (req.query.page) {
      // default limit = 10
      limit = req.query.limit ? parseInt(req.query.limit) : 10;
      offset = req.query.page == 1 ? 0 : (parseInt(req.query.page) - 1) * limit;
    }

    // get user id
    const userId = req.userData.id;

    const {
      data: fines,
      count: totalFines,
      error,
    } = await getFinesByUser(userId, offset, limit);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    successResponse({
      response: res,
      status: httpStatus.OK,
      data: multipleFineResponse(fines),
      totalData: totalFines,
      page: req.query.page,
      limit: limit,
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
