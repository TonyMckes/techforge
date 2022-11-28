import { env as _env } from "process";
import { DataTypes, Sequelize } from "sequelize";
import ArticleModel from "./article";
import CommentModel from "./comment";
import TagModel from "./tag";
import UserModel from "./user";
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

const Article = ArticleModel(sequelize);
const Comment = CommentModel(sequelize);
const Tag = TagModel(sequelize);
const User = UserModel(sequelize, DataTypes);

const db: { [key: string]: any } = { Article, Comment, Tag, User };

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export type SequelizeConnection = typeof sequelize;
export { Article, Comment, Tag, User, sequelize, Sequelize };
