const { findAccount } = require('../../src/domain/find-an-account')
  
describe('finding an account', () => { 
  const accounts = [{ cpf: '33333333333', name: 'Joe Doe', statement: [] },
                    { cpf: '22222222222', name: 'Louies Doe', statement: [] }]

  it('should return an account', async () => {
    const account = findAccount(accounts, '33333333333')

    expect(account.cpf).toBe('33333333333')
    expect(account.name).toBe('Joe Doe')
    expect(account.statement).toEqual([])
  })

  it('should throws an exception', async () => {
    function notFindAccount () {
      findAccount(accounts, '44444444444')
    }

    expect(notFindAccount).toThrow(new Error('Account not found ;('))
  })
})
