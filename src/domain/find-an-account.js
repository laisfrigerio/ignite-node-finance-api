const { findAccountByCPF } = require("../logic/find-account-by-cpf");

const findAccount = (accounts, cpf) => {
  const account = findAccountByCPF(accounts, cpf);

  if (!account) {
    throw new Error("Account not found ;(");
  }

  return account;
};

module.exports = {
  findAccount,
};
