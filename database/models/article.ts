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
    // Authors
    this.belongsTo(User, { as: "author", foreignKey: "userId" });

      // Comments
    this.hasMany(Comment, {
      as: { plural: "comments", singular: "comment" },
      foreignKey: "articleId",
      onDelete: "cascade",
    });

      // Tag list
      this.belongsToMany(Tag, {
      as: { plural: "tagList", singular: "tag" },
        foreignKey: "articleId",
        onDelete: "cascade", // FIXME: delete tags
      through: "TagList",
      timestamps: false,
      });

      // Favorites
      this.belongsToMany(User, {
      as: { plural: "favorites", singular: "favorite" },
        foreignKey: "articleId",
      through: "Favorites",
        timestamps: false,
      });
    }

    toJSON() {
      return {
        ...this.get(),
      favorited: false,
      favoritesCount: 0,
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
