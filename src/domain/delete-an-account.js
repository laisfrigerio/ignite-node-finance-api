const deleteAccount = (accounts, account) => {
  return accounts.filter(
    (currentAccount) => currentAccount.cpf !== account.cpf
  );
};

module.exports = {
  deleteAccount,
};
