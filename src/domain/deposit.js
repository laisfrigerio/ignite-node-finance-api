const deposit = (account, payload) => {
  const { description, amount } = payload
  
  const operation = {
      description,
      amount, 
      createdAt: Date.now(),
      type: 'credit'
  }

  account.statement.push(operation)
}

module.exports = {
  deposit
}
