import { User } from "database/models";
import registerUser from "./registerUser";

describe("service: register new user", () => {
  const newUserMock = {
    email: "test@mail.com",
    password: "123456",
    username: "testUser",
  };

  const findUserAndDelete = async ({ email }: typeof newUserMock) => {
    const userInDb = await User.findOne({
      where: { email },
    });

    if (!userInDb) return;
    await userInDb.destroy();
  };

  beforeAll(async () => await findUserAndDelete(newUserMock));
  afterAll(async () => await findUserAndDelete(newUserMock));

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
