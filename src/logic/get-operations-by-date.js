const getOperationsByDate = (operations, date) => {
  const dateFormat = new Date(date + " 00:00")
  return operations.filter((operation) => {
    return operation.createdAt.toDateString() === dateFormat.toDateString()
  })
}

module.exports = {
  getOperationsByDate
}
