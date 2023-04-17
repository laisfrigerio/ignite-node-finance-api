const { findAccountByCPF } = require('../src/logic/find-account-by-cpf')

describe('find the account by customer CPF', () => {
  const customer1 = { cpf: '33333333333', name: "Joe Doe" }
  const customer2 = { cpf: '22222222222', name: "Louies Doe" }

  const accounts = [customer1, customer2]

  it('should return the account when is found', () => {
      expect(findAccountByCPF(accounts, '33333333333')).toStrictEqual(customer1)
      expect(findAccountByCPF(accounts, '22222222222')).toStrictEqual(customer2)
  })
  
  it('should return undefined when the customer its not found', () => {
      expect(findAccountByCPF(accounts, '44444444444')).toBeUndefined()
      expect(findAccountByCPF(accounts, '33333333331')).toBeUndefined()
      expect(findAccountByCPF(accounts, '22222222224')).toBeUndefined()
  })
})
