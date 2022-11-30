import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import type {
  AssociatesTypes,
  Comment,
  ConnectionInstance,
  Tag,
  User,
} from ".";

export class Article extends Model<
    InferAttributes<Article>,
    InferCreationAttributes<Article>
  > {
  declare body: string;
  declare createdAt?: CreationOptional<Date>;
  declare description: string;
  declare id?: CreationOptional<number>;
    declare slug: string;
    declare title: string;
  declare updatedAt?: CreationOptional<Date>;

  declare userId: ForeignKey<User["id"]>;



  static associate({ User, Tag, Comment }: AssociatesTypes) {
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

const articleModel = (sequelize: ConnectionInstance) => {
  Article.init(
    {
      body: DataTypes.TEXT,
      description: DataTypes.TEXT,
      slug: DataTypes.STRING,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );

  return Article;
};

export default articleModel;
