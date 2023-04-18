const getAccountBalance = (account) => {
  const operations = account.statement;

  return operations.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc + operation.amount;
    }

    return acc - operation.amount;
  }, 0);
};

module.exports = {
  getAccountBalance,
};
