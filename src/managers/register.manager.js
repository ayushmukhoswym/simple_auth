const dal = require("../dal/dal");

const findUser = async (email) => {
  return await dal.findUser(email);
};

const createUser = async (details) => {
  return await dal.createUser(details);
};

module.exports = {
  findUser,
  createUser,
};
