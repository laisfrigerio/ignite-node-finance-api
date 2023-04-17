const deleteAccount = (accounts, customer) => {
  return accounts.splice(customer, 1)
}

module.exports = {
  deleteAccount
}
