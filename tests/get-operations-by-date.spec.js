const { getOperationsByDate } = require("../src/logic/get-operations-by-date");

describe("Operations by Date", () => {
  const operation1 = {
    type: "debit",
    amount: 5,
    createdAt: new Date("2023-12-02 00:00"),
  };
  const operation2 = {
    type: "credit",
    amount: 10,
    createdAt: new Date("2023-12-30 00:00"),
  };
  const operation3 = {
    type: "credit",
    amount: 10,
    createdAt: new Date("2023-05-02 00:00"),
  };

  it("should return only 1 operation", () => {
    const operations = [operation2, operation1, operation3];

    expect(getOperationsByDate(operations, "2023-12-02")).toEqual([operation1]);
  });

  it("should return only 2 operations from 2023-05-02", () => {
    const operation4 = {
      type: "credit",
      amount: 10,
      createdAt: new Date("2023-05-02 03:56"),
    };

    const operations = [operation2, operation1, operation3, operation4];

    expect(getOperationsByDate(operations, "2023-05-02")).toEqual([
      operation3,
      operation4,
    ]);
  });
});
