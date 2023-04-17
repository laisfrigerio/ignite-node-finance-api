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
