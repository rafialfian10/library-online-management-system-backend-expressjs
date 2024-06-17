const joi = require("joi");

const { Users } = require("../../database/models");
const { singleRoleResponse } = require("./roleSerializer");

exports.singleUserResponse = (userData) => {
  const user =
    userData instanceof Users ? userData.get({ plain: true }) : userData;

  return {
    id: user.id,
    username: user.username,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    phone: user.phone,
    gender: user.gender,
    address: user.address,
    photo: user.photo,
    role: singleRoleResponse(user.role),
  };
};

exports.multipleUserResponse = (usersData) => {
  return usersData.map((el) => {
    return this.singleUserResponse(el);
  });
};

exports.validateCreateUserRequest = (userData) => {
  const schema = joi.object({
    username: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    phone: joi
      .string()
      .regex(/^\d{11,12}$/)
      .required(),
  });

  try {
    const { error } = schema.validate(userData, { allowUnknown: true });
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};

exports.validateUpdateUserRequest = (userData) => {
  const schema = joi.object({
    username: joi.string(),
    email: joi.string().email(),
    password: joi.string(),
    phone: joi
      .string()
      .regex(/^\d{11,12}$/),
    gender: joi.string().allow(null, ""),
    address: joi.string().allow(null, ""),
    roleId: joi.number(),
  });

  try {
    const { error } = schema.validate(userData, { allowUnknown: true });
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};

exports.validateLoginRequest = (userData) => {
  const schema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
  });

  try {
    const { error } = schema.validate(userData, { allowUnknown: false });
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};

exports.validateResendOTPRequest = (userData) => {
  const schema = joi.object({
    email: joi.string().email().required(),
  });

  try {
    const { error } = schema.validate(userData, { allowUnknown: false });
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};

exports.validateVerifyOtpRequest = (userData) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    otp: joi.string().required(),
  });

  try {
    const { error } = schema.validate(userData, { allowUnknown: false });
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};
