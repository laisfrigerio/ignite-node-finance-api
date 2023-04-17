const findAccountByCPF = (accounts, cpf) => {
  return accounts.find((account) => account.cpf === cpf)
}

module.exports = {
  findAccountByCPF
}
