import { sequelize, User } from "database/models";
import updateUser from "./updateUser";

describe("service: update user", () => {
  const userMock = {
    email: "test@mail.com",
    password: "123456",
    username: "testUser",
  };
  const updatedUserMock = {
    ...userMock,
    username: "updatedTestUser",
  };

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await User.create(userMock);
  });
  afterAll(async () => await sequelize.close());

  it("should be a function", () => {
    expect(typeof updateUser).toBe("function");
  });

  it("should return an instance of User", async () => {
    const result = await updateUser(updatedUserMock, userMock);

    expect(result).toBeInstanceOf(User);
  });

  it("should change the username", async () => {
    const result = await updateUser(updatedUserMock, userMock);

    expect(result.username).toBe(updatedUserMock.username);
  });

  it("should throw if the email doesn't exist", async () => {
    await expect(
      updateUser(updatedUserMock, { email: "invalidTest@mail.com" })
    ).rejects.toThrow();
  });
});
