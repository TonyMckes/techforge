import { hash } from "bcrypt";
import { sequelize, User } from "database/models";
import userLogin from "./userLogin";

describe("service: user login", () => {
  const credentials = {
    email: "test@mail.com",
    password: "123456",
    username: "testUser",
  };
  const invalidCredentials = {
    email: "not-existing@mail.error",
    password: "not-valid",
  };

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await User.create({ ...credentials, password: await hash("123456", 10) });
  });
  afterAll(async () => await sequelize.close());

  it("should be a function", () => {
    expect(typeof userLogin).toBe("function");
  });

  it("should to throw if the email is not found", async () => {
    await expect(userLogin(invalidCredentials)).rejects.toThrow();
  });

  it("should return an instance of User", async () => {
    const user = await userLogin(credentials);
    expect(user).toBeInstanceOf(User);
  });
});
