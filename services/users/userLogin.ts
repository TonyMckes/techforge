import { compare } from "bcrypt";
import { User } from "database/models";
import { CreationAttributes } from "sequelize";

interface UserLogin
  extends Pick<CreationAttributes<User>, "email" | "password"> {}

async function userLogin({ email, password }: UserLogin) {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Email not found!");

  const isMatch = await compare(password, user.password);
  if (!isMatch) throw new Error("Wrong password!");

  return user;
}

export default userLogin;
