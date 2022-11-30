import { env as _env } from "process";
import { Sequelize } from "sequelize";
import ArticleModel, { Article } from "./article";
import CommentModel, { Comment } from "./comment";
import TagModel, { Tag } from "./tag";
import UserModel, { User } from "./user";
const env = _env.NODE_ENV || "development";
const config = require("../config/config")[env];

let sequelize;
if (config.use_env_variable) {
  // @ts-ignore
  sequelize = new Sequelize(_env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

ArticleModel(sequelize);
CommentModel(sequelize);
TagModel(sequelize);
UserModel(sequelize);

const db: { [key: string]: any } = { Article, Comment, Tag, User };

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export { Article, Comment, Tag, User, sequelize, Sequelize };
export type ConnectionInstance = typeof sequelize;
export interface AssociatesTypes {
  Article: typeof Article;
  Comment: typeof Comment;
  Tag: typeof Tag;
  User: typeof User;
}
