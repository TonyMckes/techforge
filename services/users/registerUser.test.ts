import { sequelize, User } from "database/models";
import registerUser from "./registerUser";

describe("service: register new user", () => {
  const newUserMock = {
    email: "test@mail.com",
    password: "123456",
    username: "testUser",
  };

  beforeAll(async () => await sequelize.sync({ force: true }));
  afterAll(async () => await sequelize.close());

  it("should be a function", () => {
    expect(typeof registerUser).toBe("function");
  });

  it("should return an instance of User", async () => {
    const user = await registerUser(newUserMock);
    expect(user).toBeInstanceOf(User);
  });

  it("should to throw if the email already exists", async () => {
    await expect(registerUser(newUserMock)).rejects.toThrow();
  });
});
