const updateFineByAdmin = require("./updateFineByAdmin");

module.exports = {
  getFinesByUser: require("./getFinesByUser"),
  getFinesByAdmin: require("./getFinesByAdmin"),
  getFine: require("./getFine"),
  updateFine: require("./updateFine"),
  updateFineByAdmin: require("./updateFineByAdmin"),
  deleteFine: require("./deleteFine"),
  notification: require("./notification"),
};
