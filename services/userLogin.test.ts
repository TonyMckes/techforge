import { User } from "database/models";
import registerUser from "./registerUser";
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
  const userMock = {
    ...userCredentials,
    username: "testUser",
    bio: null,
    createdAt: undefined,
    following: false,
    id: undefined,
    image: null,
    password: undefined,
    updatedAt: undefined,
  };

  const findUserAndDelete = async (email: string) => {
    const userInDb = await User.findOne({
      where: { email },
    });

    if (!userInDb) return;
    await userInDb.destroy();
  };

  afterAll(async () => await findUserAndDelete(userCredentials.email));

  it("should be a function", () => {
    expect(typeof userLogin).toBe("function");
  });

  it("should to throw if the email is not found", async () => {
    await expect(userLogin(invalidCredentials)).rejects.toThrow();
  });

  it("should return a User (matching object)", async () => {
    await registerUser(newUserMock);

    const user = await userLogin(userCredentials);
    expect(user).toMatchObject(userMock);
  });
});
