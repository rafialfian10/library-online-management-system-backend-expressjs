const httpStatus = require("http-status");

const { hashPassword } = require("../../pkg/helpers/bcrypt");
const { otpCodeGenerator } = require("../../pkg/helpers/otpCodeGenerator");
const { sendVerificationEmail } = require("../../pkg/helpers/sendMail");
const { setRedisValue, getRedisValue } = require("../../pkg/helpers/redis");

const {
  successResponse,
  errorResponse,
} = require("../../serializers/responseSerializer");
const {
  singleUserResponse,
  validateCreateUserRequest,
} = require("../../serializers/userSerializer");
const {
  getUser,
  createUser,
  getUserByEmailAndPhone,
} = require("../../repositories/userRepository");

module.exports = async (req, res) => {
  try {
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: await hashPassword(req.body.password, 11),
      phone: req.body.phone,
    };

    /**
     * user not logged in only can register as user
     * admin only can register new user as user or admin
     */
    if (!req.body?.roleId) {
      newUser.roleId = 3;
    } else {
      newUser.roleId = req.body.roleId;
    } 

    const error = validateCreateUserRequest(newUser);
    if (error) {
      const errors = new Error(error);
      errors.status = httpStatus.BAD_REQUEST;
      throw errors;
    }

    // check is email/phone already used by another user
    const { error: errorGetUserByEmailAndPhone } = await getUserByEmailAndPhone(
      newUser.email,
      newUser.phone
    );
    if (!errorGetUserByEmailAndPhone) {
      const error = new Error("Email or Phone already used by another user");
      error.status = httpStatus.BAD_REQUEST;
      throw error;
    }

    // create user
    const { data: user, error: errorCreateNewUser } = await createUser(newUser);
    if (errorCreateNewUser) {
      const error = new Error(errorCreateNewUser);
      error.status = httpStatus.INTERNAL_SERVER_ERROR;
      throw error;
    }

    // generate otp code
    const otp = otpCodeGenerator(6);
    const hashedOtp = await hashPassword(otp, 11);

    // store hashed otp in redis for 5 minutes
    setRedisValue(user.email, hashedOtp, 1 * 60);

    // send otp code to email
    sendVerificationEmail(user, otp);

    const { data: userRegistered, error: errorGetUser } = await getUser(
      user.id
    );

    if (errorGetUser) {
      const errors = new Error(errorGetUser);
      errors.status = httpStatus.NOT_FOUND;
      throw errors;
    }

    // get data user in redis
    const { data: redisGetVal, error: errRedisGetVal } = await getRedisValue(
      req.body.email
    );
    if (errRedisGetVal) {
      throw new Error(errRedisGetVal);
    }

    successResponse({
      response: res,
      message: "Register successfully",
      status: httpStatus.CREATED,
      data: {
        ...singleUserResponse(userRegistered),
        otp: redisGetVal,
      },
    });
  } catch (error) {
    errorResponse({
      response: res,
      error: error,
    });
  }
};
