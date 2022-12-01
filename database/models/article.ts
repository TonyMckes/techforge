import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
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
  InferAttributes<
    Article,
    { omit: "favorited" | "favoritesCount" | "tagList" | "author" }
  >,
  InferCreationAttributes<
    Article,
    { omit: "favorited" | "favoritesCount" | "tagList" | "author" }
  >
  > {
  declare body: string;
  declare createdAt?: CreationOptional<Date>;
  declare description: string;
  declare id?: CreationOptional<number>;
    declare slug: string;
    declare title: string;
  declare updatedAt?: CreationOptional<Date>;

  // Authors
  declare createAuthor: HasOneCreateAssociationMixin<User>;
  declare getAuthor: HasOneGetAssociationMixin<User>;
  declare setAuthor: HasOneSetAssociationMixin<User, number>;

  // Comments
  declare addComment: HasManyAddAssociationMixin<Comment, number>;
  declare createComment: HasManyCreateAssociationMixin<Comment, "articleId">;
  declare hasComment: HasManyHasAssociationMixin<Comment, number>;
  declare removeComment: HasManyRemoveAssociationMixin<Comment, number>;

  declare addComments: HasManyAddAssociationsMixin<Comment, number>;
  declare countComments: HasManyCountAssociationsMixin;
  declare getComments: HasManyGetAssociationsMixin<Comment>;
  declare hasComments: HasManyHasAssociationsMixin<Comment, number>;
  declare removeComments: HasManyRemoveAssociationsMixin<Comment, number>;
  declare setComments: HasManySetAssociationsMixin<Comment, number>;

  // Tags
  declare addTag: HasManyAddAssociationMixin<Tag, string>;
  declare createTag: HasManyCreateAssociationMixin<Tag, "articleId">;
  declare hasTag: HasManyHasAssociationMixin<Tag, string>;
  declare removeTag: HasManyRemoveAssociationMixin<Tag, string>;

  declare addTagList: HasManyAddAssociationsMixin<Tag, string>;
  declare countTagList: HasManyCountAssociationsMixin;
  declare getTagList: HasManyGetAssociationsMixin<Tag>;
  declare hasTagList: HasManyHasAssociationsMixin<Tag, string>;
  declare removeTagList: HasManyRemoveAssociationsMixin<Tag, string>;
  declare setTagList: HasManySetAssociationsMixin<Tag, string>;

  // Favorites
  declare addFavorite: HasManyAddAssociationMixin<User, number>;
  declare createFavorite: HasManyCreateAssociationMixin<User, "articleId">;
  declare hasFavorite: HasManyHasAssociationMixin<User, number>;
  declare removeFavorite: HasManyRemoveAssociationMixin<User, number>;

  declare addFavorites: HasManyAddAssociationsMixin<User, number>;
  declare countFavorites: HasManyCountAssociationsMixin;
  declare getFavorites: HasManyGetAssociationsMixin<User>;
  declare hasFavorites: HasManyHasAssociationsMixin<User, number>;
  declare removeFavorites: HasManyRemoveAssociationsMixin<User, number>;
  declare setFavorites: HasManySetAssociationsMixin<User, number>;

  declare static associations: {
    author: Association<Article, User>;
    comments: Association<Article, Comment>;
    favorites: Association<Article, User>;
    tagList: Association<Article, Tag>;
  };

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
