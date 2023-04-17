const { getOperationsByDate } = require('../logic/get-operations-by-date')

const getAccountOperations = (operations, date) => {
  if (date) {
      return getOperationsByDate(operations, date)
  }

  return operations
}

module.exports = {
  getAccountOperations
}
