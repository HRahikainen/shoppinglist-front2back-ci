const app = require("../app");
const request = require("supertest").agent(app);
const localmongoose = require("mongoose");
const keys = require("../config/keys");
localmongoose.Promise = global.Promise;
const Users = require("../models/Users");

describe("Test database connection", () => {
  test("Test connection", done => {
    localmongoose.connect(keys.MONGO_URI).then(() => {
      expect(localmongoose.connection.readyState).toBe(1);
    });
    localmongoose.disconnect();
    done();
  });
});

describe("Test the logout path", () => {
  test("It should respond with 200 to GET method", () => {
    return request.get("/users/logout").then(response => {
      expect(response.statusCode).toBe(200);
    });
  });
});

describe("Test the users path", () => {
  test("It should return 422 without email for POST method", () => {
    return request
      .post("/users")
      .send({ user: { password: "1234" } })
      .then(response => {
        expect(response.statusCode).toBe(422);
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

  test("It should return user object with _id, email and token for POST method", done => {
    return request
      .post("/users")
      .send({ user: { email: "jdoe@gmail.com", password: "12345" } })
      .then(response => {
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect.objectContaining({
          user: {
            _id: expect.any(String),
            email: expect.any(String),
            token: expect.any(String)
          }
        });
        done();
      });
  });
});
