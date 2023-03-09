const dal = require("../dal/dal");

const findUser = async (email) => {
  return await dal.findUser(email);
};

module.exports = {
  findUser,
};
