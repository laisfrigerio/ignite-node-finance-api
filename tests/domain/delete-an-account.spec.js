const { deleteAccount } = require("../../src/domain/delete-an-account");

describe("deleting an account", () => {
  const accountJohn = { cpf: "33333333333", name: "Joe Doe", statement: [] };
  const accountLouies = {
    cpf: "22222222222",
    name: "Louies Doe",
    statement: [],
  };

  const accounts = [accountJohn, accountLouies];

  it("should return the same accounts list when cpf not exists", async () => {
    expect(deleteAccount(accounts, { cpf: "44444444444" })).toEqual(accounts);
  });

  it("should deleting an existing account", async () => {
    expect(deleteAccount([...accounts], accountJohn)).toEqual([
      { cpf: "22222222222", name: "Louies Doe", statement: [] },
    ]);
  });
});
