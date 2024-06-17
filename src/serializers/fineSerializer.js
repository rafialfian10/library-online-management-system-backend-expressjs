const joi = require("joi");

const { Fines } = require("../../database/models");

exports.singleFineResponse = (fineData) => {
  const fine =
    fineData instanceof Fines ? fineData.get({ plain: true }) : fineData;

  return {
    id: fine.id,
    idOrder: fine.idOrder,
    idUser: fine.idUser,
    user: fine.user,
    idBook: fine.idBook,
    book: fine.book,
    totalDay: fine.totalDay,
    totalFine: fine.totalFine,
    status: fine.status,
    token: fine.token,
  };
};

exports.multipleFineResponse = (finesData) => {
  return finesData.map((el) => {
    return this.singleFineResponse(el);
  });
};

exports.validateCreateFineRequest = (fineData) => {
  const schema = joi.object({
    idBook: joi.number().required(),
    idUser: joi.string().required(),
    totalDay: joi.number().required(),
    totalFine: joi.number().required(),
  });

  try {
    const { error } = schema.validate(fineData, { allowUnknown: true });
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};

exports.validateUpdateFineRequest = (fineData) => {
  const schema = joi.object({
    idBook: joi.number().required(),
    idUser: joi.string().required(),
    totalDay: joi.number().required(),
    totalFine: joi.number().required(),
    status: joi.string(),
    token: joi.string(),
  });

  try {
    const { error } = schema.validate(fineData, { allowUnknown: true });
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};

exports.validateUpdateFineAdminRequest = (fineData) => {
  const schema = joi.object({
    idBook: joi.number().required(),
    idUser: joi.string().required(),
    status: joi.string(),
  });

  try {
    const { error } = schema.validate(fineData, { allowUnknown: true });
    if (error) {
      throw new Error(`request data invalid: ${error}`);
    }
    return null;
  } catch (error) {
    return error.message;
  }
};
