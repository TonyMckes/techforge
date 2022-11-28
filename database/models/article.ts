import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import type { ArticleAssociates, ConnectionInstance } from "./model-types";

const articleModel = (sequelize: ConnectionInstance) => {
  class Article extends Model<
    InferAttributes<Article>,
    InferCreationAttributes<Article>
  > {
    declare slug: string;
    declare title: string;
    declare description: string;
    declare body: string;

    static associate({ User, Tag, Comment }: ArticleAssociates) {
      // Users
      this.belongsTo(User, { foreignKey: "userId", as: "author" });

      // Comments
      this.hasMany(Comment, { foreignKey: "articleId", onDelete: "cascade" });

      // Tag list
      this.belongsToMany(Tag, {
        through: "TagList",
        as: "tagList",
        foreignKey: "articleId",
        timestamps: false,
        onDelete: "cascade", // FIXME: delete tags
      });

      // Favorites
      this.belongsToMany(User, {
        through: "Favorites",
        foreignKey: "articleId",
        timestamps: false,
      });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        userId: undefined,
      };
    }
  }

  Article.init(
    {
      slug: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      body: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );

  return Article;
};

export default articleModel;
