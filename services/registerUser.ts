import { hash } from "bcrypt";
import { User } from "database/models";
import { CreationAttributes } from "sequelize";

async function registerUser({
  email,
  password,
  username,
}: CreationAttributes<User>) {
  const [userDoc, created] = await User.findOrCreate({
    where: { email },
    defaults: { email, password: await hash(password, 10), username },
  });

  if (!created) throw Error("Email already exists!");

  const user = userDoc.toJSON();

  return { user };
}

export default registerUser;
