const { Fines, Users, Books } = require("../../database/models");
// ---------------------------------------------------------

exports.getFinesByAdmin = async (
  offset = 0,
  limit = 10,
  filter = {}
) => {
  const response = { data: null, error: null, count: 0 };

  try {
    response.data = await Fines.findAll({
      offset: offset,
      limit: limit,
      where: filter,
      include: [
        {
          model: Users,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
          },
        },
        {
          model: Books,
          as: "book",
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });
    if (!response.data) {
      throw new Error("fines data not found");
    }

    response.count = await Fines.count({
      where: filter,
    });
  } catch (error) {
    response.error = `error on get datas : ${error.message}`;
  }

  return response;
};

exports.getFinesByUser = async (
  userId,
  offset = 0,
  limit = 10,
  filter = {}
) => {
  const response = { data: null, error: null, count: 0 };

  try {
    response.data = await Fines.findAll({
      offset: offset,
      limit: limit,
      where: { ...filter, idUser: userId },
      include: [
        {
          model: Users,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
          },
        },
        {
          model: Books,
          as: "book",
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });
    if (!response.data) {
      throw new Error("fines data not found");
    }

    response.count = await Fines.count({
      where: { ...filter, idUser: userId },
    });
  } catch (error) {
    response.error = `error on get datas : ${error.message}`;
  }

  return response;
};

exports.getFine = async (fineId) => {
  const response = { data: null, error: null };

  try {
    response.data = await Fines.findOne({
      where: {
        id: fineId,
      },
      include: [
        {
          model: Users,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
          },
        },
        {
          model: Books,
          as: "book",
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });

    if (!response.data) {
      throw new Error(`fine not found`);
    }
  } catch (error) {
    response.error = `error on get data : ${error.message}`;
  }

  return response;
};

exports.getFineOrderId = async (idOrder) => {
  const response = { data: null, error: null };

  try {
    response.data = await Fines.findOne({
      where: {
        idOrder: idOrder,
      },
      include: [
        {
          model: Users,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt", "deletedAt", "password"],
          },
        },
        {
          model: Books,
          as: "book",
          attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
        },
      ],
      attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] },
    });

    if (!response.data) {
      throw new Error(`fine order id not found`);
    }
  } catch (error) {
    response.error = `error on get data : ${error.message}`;
  }

  return response;
};

exports.createFine = async (fine) => {
  const response = { data: null, error: null };

  try {
    response.data = await Fines.create({
      idBook: fine.idBook,
      idUser: fine.idUser,
      totalDay: fine.totalDay,
      totalFine: fine.totalFine,
      status: fine.status,
      token: fine.token,
    });
  } catch (error) {
    response.error = `error on create data : ${error.message}`;
  }

  return response;
};

exports.updateFine = async (fine) => {
  const response = { data: null, error: null };

  try {
    response.data = await fine.save();
  } catch (error) {
    response.error = `error on update data : ${error.message}`;
  }

  return response;
};

exports.deleteFine = async (fine) => {
  const response = { data: null, error: null };

  try {
    response.data = await fine.destroy();
  } catch (error) {
    response.error = `error on delete data : ${error.message}`;
  }

  return response;
};

