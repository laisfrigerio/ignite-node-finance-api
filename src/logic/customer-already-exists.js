const customerAlreadyExists = (accounts, cpf) => {
  return accounts.some((account) => account.cpf === cpf);
};

module.exports = {
  customerAlreadyExists,
};
