const { createAccount } = require("../../src/domain/create-an-account");

describe("creating an account", () => {
  it("should return an account", async () => {
    const payload = { cpf: "11111111111", name: "Anne Doe" };

    const account = createAccount([], payload);

    expect(account.cpf).toBe(payload.cpf);
    expect(account.name).toBe(payload.name);
    expect(account.statement).toEqual([]);
  });

  it("should throws an exception", async () => {
    const accounts = [{ cpf: "11111111111", name: "Anne Doe" }];
    const payload = { cpf: "11111111111", name: "Louie Doe" };

    function createAnExistingAccount() {
      createAccount(accounts, payload);
    }

    expect(createAnExistingAccount).toThrow(
      new Error("CPF is already registered!")
    );
  });
});
