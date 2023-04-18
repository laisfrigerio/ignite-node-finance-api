const {
  customerAlreadyExists,
} = require("../src/logic/customer-already-exists");

describe("check customer is already registered", () => {
  const accounts = [
    { cpf: "33333333333", name: "Joe Doe" },
    { cpf: "22222222222", name: "Louies Doe" },
  ];

  it("should return false because the customer CPF is not registered", async () => {
    expect(customerAlreadyExists(accounts, "44444444444")).toBe(false);
    expect(customerAlreadyExists(accounts, "33333333331")).toBe(false);
    expect(customerAlreadyExists(accounts, "22222222224")).toBe(false);
  });

  it("should return true because the customer CPF is registered", () => {
    expect(customerAlreadyExists(accounts, "22222222222")).toBe(true);
    expect(customerAlreadyExists(accounts, "33333333333")).toBe(true);
  });
});
