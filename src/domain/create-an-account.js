const { v4 } = require("uuid");

const { customerAlreadyExists } = require("../logic/customer-already-exists");

const createAccount = (accounts, payload) => {
  const { cpf, name } = payload;

  if (customerAlreadyExists(accounts, cpf)) {
    throw new Error("CPF is already registered!");
  }

  const account = {
    cpf,
    id: v4(),
    name,
    statement: [],
  };

  return account;
};

module.exports = {
  createAccount,
};
