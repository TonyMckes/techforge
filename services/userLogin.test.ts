import { hash } from "bcrypt";
import { User } from "database/models";
import userLogin from "./userLogin";

describe("service: user login", () => {
  const newUserMock = {
    email: "test@mail.com",
    password: "123456",
    username: "testUser",
  };
  const userCredentials = {
    email: "test@mail.com",
    password: "123456",
  };
  const invalidCredentials = {
    email: "not-existing@mail.error",
    password: "not-valid",
  };

  const findUserAndDelete = async (email: string) => {
    const userInDb = await User.findOne({
      where: { email },
    });

    if (!userInDb) return;
    await userInDb.destroy();
  };
  beforeAll(
    async () =>
      await User.create({ ...newUserMock, password: await hash("123456", 10) })
  );
  afterAll(async () => await findUserAndDelete(userCredentials.email));

  it("should be a function", () => {
    expect(typeof userLogin).toBe("function");
  });

  it("should to throw if the email is not found", async () => {
    await expect(userLogin(invalidCredentials)).rejects.toThrow();
  });

  it("should return an instance of User", async () => {
    const user = await userLogin(userCredentials);
    expect(user).toBeInstanceOf(User);
  });
});
