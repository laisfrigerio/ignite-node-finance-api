const supertest = require("supertest");
const app = require("../src/app");

it("should return a hello world message", async () => {
  await supertest(app)
    .get("/")
    .then((response) => {
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Hello World");
    });
});
