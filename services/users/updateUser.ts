import { hash } from "bcrypt";
import { User } from "database/models";
import { LoggedUser } from "lib/session";
import { CreationAttributes } from "sequelize";

async function updateUser(
  userData: CreationAttributes<User>,
  loggedUser: LoggedUser
) {
  const { password }: { password: string } = userData;
  const userInDb = await User.findOne({ where: { email: loggedUser.email } });
  if (!userInDb) throw new Error("UnauthorizedError");

  Object.entries(userData).forEach((entry) => {
    const [key, value] = entry;

    if (value !== undefined && key !== "password") {
      userInDb.set(key, value);
    }
  });

  if (password && password.length > 5) {
    userInDb.set("password", await hash(password, 10));
  }

  await userInDb.save();

  return userInDb;
}

export default updateUser;
