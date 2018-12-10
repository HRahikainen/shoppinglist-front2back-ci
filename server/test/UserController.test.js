const app = require("../app");
const request = require("supertest").agent(app);
const mongoose = require("mongoose");

describe("Test the logout path", () => {
  afterAll(async () => await mongoose.disconnect());

  test("It should response the GET method", done => {
    return request.get("/users/logout").then(response => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
