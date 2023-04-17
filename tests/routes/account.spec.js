const supertest = require('supertest')
const app = require('../../src/app')

const payloadJohn = {
  cpf: '33333333333',
  name: 'John Doe'
}

beforeEach(async () => {
  await supertest(app).post('/reset')
})

describe('Creating an account', () => {
  it('should save a new account', async () => {
    await supertest(app)
            .post('/accounts')
            .send(payloadJohn)
            .then((response) => {
                expect(response.status).toEqual(201)
                expect(response.body.message).toEqual('Account registered!')
                expect(response.body.account.cpf).toEqual(payloadJohn.cpf)
                expect(response.body.account.name).toEqual(payloadJohn.name)
                expect(typeof response.body.account.id).toBe("string")
            })
  })

  it('should return an error because the CPF already exists', async () => {
    await supertest(app)
            .post('/accounts')
            .send(payloadJohn)

    await supertest(app)
            .post('/accounts')
            .send(payloadJohn)
            .then((response) => {
                expect(response.status).toEqual(400)
                expect(response.body.message).toEqual('CPF is already registered!')
            })
  })
})

describe('Finding an account by CPF', () => {
  beforeEach(async () => {
      await supertest(app)
              .post('/accounts')
              .send(payloadJohn)
  })

  it('should find the account', async () => {
    await supertest(app)
            .get(`/accounts/${payloadJohn.cpf}`)
            .then((response) => {
                expect(response.status).toEqual(200)
                expect(response.body.account.cpf).toEqual(payloadJohn.cpf)
                expect(response.body.account.name).toEqual(payloadJohn.name)
                expect(typeof response.body.account.id).toBe("string")
            })
  })

  it('should not find the account', async () => {
    await supertest(app)
            .get('/accounts/44444444444')
            .then((response) => {
                expect(response.status).toEqual(404)
                expect(response.body.message).toEqual('Account not found ;(')
            })
  })
})

describe('Updating an account', () => {
  const payloadAnne = {
      cpf: '44444444444',
      name: 'Anne Doe'
  }

  it('should update an existing customer', async () => {
    await supertest(app)
            .post('/accounts')
            .send(payloadJohn)
            .then((response) => {
                expect(response.status).toBe(201)
            })

    await supertest(app)
            .post('/accounts')
            .send(payloadAnne)
            .then((response) => {
                expect(response.status).toBe(201)
            })

    await supertest(app)
            .get(`/accounts/${payloadJohn.cpf}`)
            .then((response) => {
                const { cpf, name } = payloadJohn
                expect(response.status).toBe(200)
                expect(response.body.account.name).toBe(name)
                expect(response.body.account.cpf).toBe(cpf)
            })

    await supertest(app)
            .get(`/accounts/${payloadAnne.cpf}`)
            .then((response) => {
                const { cpf, name } = payloadAnne
                expect(response.status).toBe(200)
                expect(response.body.account.name).toBe(name)
                expect(response.body.account.cpf).toBe(cpf)
            })

    const payloadUpdate = { ...payloadJohn, name: 'Alexander Due' }
    await supertest(app)
            .put(`/accounts/${payloadUpdate.cpf}`)
            .send({ name: payloadUpdate.name, cpf: '55555555555' })
            .then((response) => {
                const { cpf, name } = payloadUpdate
                expect(response.status).toBe(200)
                expect(response.body.account.name).toBe(name)
                expect(response.body.account.cpf).toBe(cpf)
            })

    await supertest(app)
            .get(`/accounts/${payloadUpdate.cpf}`)
            .then((response) => {
                const { cpf, name } = payloadUpdate
                expect(response.status).toBe(200)
                expect(response.body.account.name).toBe(name)
                expect(response.body.account.cpf).toBe(cpf)
            })
  })

  it('should return an error because the CPF is already exists', async () => {
    await supertest(app)
            .post('/accounts')
            .send(payloadJohn)

    await supertest(app)
            .post('/accounts')
            .send(payloadJohn)
            .then((response) => {
                expect(response.status).toEqual(400)
                expect(response.body.message).toEqual('CPF is already registered!')
            })
  })
})

describe('Deleting an existing account', () => {
  const payloadAnne = {
      cpf: '44444444444',
      name: 'Anne Doe'
  }

  it('should delete an existing customer', async () => {
    await supertest(app)
            .post('/accounts')
            .send(payloadJohn)
            .then((response) => {
                expect(response.status).toBe(201)
            })

    await supertest(app)
            .post('/accounts')
            .send(payloadAnne)
            .then((response) => {
                expect(response.status).toBe(201)
            })

    await supertest(app)
            .get(`/accounts/${payloadJohn.cpf}`)
            .then((response) => {
                const { cpf, name } = payloadJohn
                expect(response.status).toBe(200)
                expect(response.body.account.name).toBe(name)
                expect(response.body.account.cpf).toBe(cpf)
            })

    await supertest(app)
            .get(`/accounts/${payloadAnne.cpf}`)
            .then((response) => {
                const { cpf, name } = payloadAnne
                expect(response.status).toBe(200)
                expect(response.body.account.name).toBe(name)
                expect(response.body.account.cpf).toBe(cpf)
            })

    await supertest(app)
            .delete(`/accounts/${payloadJohn.cpf}`)
            .then((response) => {
                expect(response.status).toBe(200)
                expect(response.body.message).toBe('Account deleted!')
            })

    await supertest(app)
            .get(`/accounts/${payloadJohn.cpf}`)
            .then((response) => {
                expect(response.status).toBe(404)
                expect(response.body.message).toBe('Account not found ;(')
            })

    await supertest(app)
            .get(`/accounts/${payloadAnne.cpf}`)
            .then((response) => {
                const { cpf, name } = payloadAnne
                expect(response.status).toBe(200)
                expect(response.body.account.name).toBe(name)
                expect(response.body.account.cpf).toBe(cpf)
            })
  })
})

describe('Return the operations of a account', () => {
  beforeEach(async () => {
    await supertest(app)
            .post('/accounts')
            .send(payloadJohn)
  })

  it('should find the customer and return a empty operation list', async () => {
    await supertest(app)
            .get(`/accounts/${payloadJohn.cpf}/extract`)
            .then((response) => {
                expect(response.status).toEqual(200)
                expect(response.body).toEqual([])
            })
  })

  it('should not found the customer', async () => {
    await supertest(app)
            .get('/accounts/44444444444/extract')
            .then((response) => {
                expect(response.status).toEqual(404)
                expect(response.body.message).toEqual('Account not found ;(')
            })
  })
})

describe('Save a deposit', () => {
  const depositPayload = {
      description: 'First deposit',
      amount: 10
  }

  beforeEach(async () => {
      await supertest(app)
              .post('/accounts')
              .send(payloadJohn)
  })

  it('should add a new deposit in a existing account', async () => {
    await supertest(app)
            .get(`/accounts/${payloadJohn.cpf}/extract`)
            .then((response) => {
                expect(response.body).toEqual([])
            })

    await supertest(app)
            .post(`/accounts/${payloadJohn.cpf}/deposit`)
            .send(depositPayload)
            .then((response) => {
                expect(response.status).toEqual(201)
                expect(response.body.message).toEqual('Deposit with success')
            })

    await supertest(app)
            .get(`/accounts/${payloadJohn.cpf}/extract`)
            .then((response) => {
                const firstDeposit = response.body[0]
                expect(response.status).toEqual(200)
                expect(firstDeposit.description).toBe('First deposit')
                expect(firstDeposit.type).toBe('credit')
                expect(firstDeposit.amount).toBe(10)
            })
  })

  it('should not a deposit because the account not exists', async () => {
    await supertest(app)
            .post('/accounts/11111111111/deposit')
            .send(depositPayload)
            .then((response) => {
                expect(response.status).toEqual(404)
            })
  })
})

describe('Save a withdraw', () => {
  const depositPayload = {
    description: 'First deposit',
    amount: 10
  }

  const withdrawPayload = {
    description: 'First withdraw',
    amount: 2
  }

  beforeEach(async () => {
    await supertest(app)
            .post('/accounts')
            .send(payloadJohn)
  })

  it('should add a new withdraw in a existing account', async () => {
    await supertest(app)
            .get(`/accounts/${payloadJohn.cpf}/extract`)
            .then((response) => {
                expect(response.body).toEqual([])
            })

    await supertest(app)
            .post(`/accounts/${payloadJohn.cpf}/deposit`)
            .send(depositPayload)
            .then((response) => {
                expect(response.status).toEqual(201)
                expect(response.body.message).toEqual('Deposit with success')
            })

    await supertest(app)
            .post(`/accounts/${payloadJohn.cpf}/withdraw`)
            .send(withdrawPayload)
            .then((response) => {
                expect(response.status).toEqual(201)
                expect(response.body.message).toEqual('Withdraw with success')
            })

    await supertest(app)
            .get(`/accounts/${payloadJohn.cpf}/extract`)
            .then((response) => {
                const firstDeposit = response.body[0]
                const firstWithdraw = response.body[1]

                expect(response.status).toEqual(200)
                
                expect(firstDeposit.description).toBe('First deposit')
                expect(firstDeposit.type).toBe('credit')
                expect(firstDeposit.amount).toBe(10)

                expect(firstWithdraw.description).toBe('First withdraw')
                expect(firstWithdraw.type).toBe('debit')
                expect(firstWithdraw.amount).toBe(2)
            })
  })

  it('should not a withdraw because the account not exists', async () => {
    await supertest(app)
            .post('/accounts/11111111111/withdraw')
            .send(depositPayload)
            .then((response) => {
                expect(response.status).toEqual(404)
            })
  })

  it('should not a withdraw because of Insufficient funds', async () => {
    const withdrawPayload = {
        description: 'First withdraw',
        amount: 15
    }

    await supertest(app)
            .post(`/accounts/${payloadJohn.cpf}/withdraw`)
            .send(withdrawPayload)
            .then((response) => {
                expect(response.status).toEqual(400)
                expect(response.body.message).toBe('Insufficient funds ;(')
            })
  })
})
