const { updateAccount } = require("../../src/domain/update-an-account");

describe("updating an account", () => {
  it("should return an updating account", async () => {
    const cpf = "11111111111";

    const currentAccount = { cpf, name: "Anne Doe" };
    const payload = { cpf, name: "Anne Jon Doe" };

    const account = updateAccount(currentAccount, payload);

    expect(account.cpf).toBe(cpf);
    expect(account.name).toBe("Anne Jon Doe");
  });
});
