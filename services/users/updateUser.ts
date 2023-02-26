import { hash } from "bcrypt";
import { User } from "database/models";
import type { CreationAttributes } from "sequelize";

async function updateUser(
  userData: CreationAttributes<User>,
  loggedUser: Partial<CreationAttributes<User>>
) {
  const { password }: { password: string } = userData;
  const userInDb = await User.findOne({ where: { email: loggedUser.email } });
  if (!userInDb) throw new Error("UnauthorizedError");

  Object.entries(userData).forEach((entry) => {
    const [key, value] = entry as [keyof typeof userData, string];

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
