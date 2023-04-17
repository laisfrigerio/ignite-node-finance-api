const supertest = require('supertest')
const app = require('../../src/app')

const payload = {
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
            .send(payload)
            .then((response) => {
                expect(response.status).toEqual(201)
                expect(response.body.message).toEqual('Account registered!')
                expect(response.body.account.cpf).toEqual(payload.cpf)
                expect(response.body.account.name).toEqual(payload.name)
                expect(typeof response.body.account.id).toBe("string")
            })
  })

  it('should return an error because the CPF already exists', async () => {
    await supertest(app)
            .post('/accounts')
            .send(payload)

    await supertest(app)
            .post('/accounts')
            .send(payload)
            .then((response) => {
                expect(response.status).toEqual(400)
                expect(response.body.message).toEqual('CPF is already registered!')
            })
  })
})
