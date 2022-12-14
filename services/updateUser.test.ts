import { User } from "database/models";
import updateUser from "./updateUser";

const userMock = {
  email: "test@mail.com",
  password: "123456",
  username: "testUser",
};
const updatedUserMock = {
  ...userMock,
  username: "updatedTestUser",
};

describe("service: update user", () => {
  beforeAll(async () => await User.create(userMock));
  afterAll(
    async () => await User.destroy({ where: { email: userMock.email } })
  );

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
      updateUser(updatedUserMock, "invalidTest@mail.com")
    ).rejects.toThrow();
  });
});
