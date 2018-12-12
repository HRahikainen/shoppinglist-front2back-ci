const app = require("../app");
const request = require("supertest").agent(app);
const mongoose = require("mongoose");

describe("Test the logout path", () => {
  //afterAll(async () => await mongoose.disconnect());

  test("It should response the GET method", done => {
    return request.get("/users/logout").then(response => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test("It should return 422 without email for POST method", done => {
    return request
      .post("/users")
      .send({ user: { password: "1234" } })
      .then(response => {
        expect(response.statusCode).toBe(422);
        done();
      });
  });

  test("It should return 422 without password for POST method", done => {
    return request
      .post("/users")
      .send({ user: { email: "jdoe@gmail.com" } })
      .then(response => {
        expect(response.statusCode).toBe(422);
        done();
      });
  });
});
