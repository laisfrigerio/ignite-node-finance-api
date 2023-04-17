const { getAccountBalance } = require('./get-account-balance')

const withdraw = (account, payload) => {
  const { description, amount } = payload

  const currentBalance = getAccountBalance(account)

  if (amount > currentBalance) {
      throw new Error('Insufficient funds ;(')
  }
  
  const operation = {
      description,
      amount, 
      createdAt: Date.now(),
      type: 'debit'
  }

  account.statement.push(operation)
}

module.exports = {
  withdraw
}
