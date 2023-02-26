/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { env as _env } from "process";
import { Sequelize } from "sequelize";
import sequelizeConfig from "../config/config";
import ArticleModel, { Article } from "./article";
import CommentModel, { Comment } from "./comment";
import TagModel, { Tag } from "./tag";
import UserModel, { User } from "./user";
const env = _env.NODE_ENV || "development";

const config = sequelizeConfig[env];

const sequelize = new Sequelize(
  config.database!,
  config.username!,
  config.password!,
  config
);

ArticleModel(sequelize);
CommentModel(sequelize);
TagModel(sequelize);
UserModel(sequelize);

const db = { Article, Comment, Tag, User };

Object.keys(db).forEach((modelName) => {
  if (db[modelName as keyof typeof db]["associate"]) {
    db[modelName as keyof typeof db].associate(db);
  }
});

export { Article, Comment, Tag, User, sequelize };
export interface AssociatesTypes {
  Article: typeof Article;
  Comment: typeof Comment;
  Tag: typeof Tag;
  User: typeof User;
}
