const express = require('express')

const { createAccount } = require('./domain/create-an-account')

const app = express()

app.use(express.json())

let accounts = []

app.get('/', (request, response) => {
    return response.json({ message: 'Hello World' })
})

app.post('/reset', (_, response) => {
  accounts = []
  return response.json({ message: 'Local database reset' })
})

app.post('/accounts', (request, response) => {
  try {
    const payload = request.body

    const account = createAccount(accounts, payload)

    accounts.push(account)

    return response
            .status(201)
            .json({ 
                message: 'Account registered!',
                account
            })

  } catch (error) {
    return response
            .status(400)
            .json({ message: error.message })
  }
})

module.exports = app
