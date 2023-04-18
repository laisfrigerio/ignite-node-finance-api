const updateAccount = (currentAccount, payload) => {
  const { name } = payload;
  currentAccount.name = name;
  return currentAccount;
};

module.exports = {
  updateAccount,
};
