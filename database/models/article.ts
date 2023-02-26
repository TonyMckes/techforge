import type {
  Association,
  CreationOptional,
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
  Sequelize,
} from "sequelize";
import { DataTypes, Model } from "sequelize";
import type { AssociatesTypes, Comment, Tag, User } from ".";

export class Article extends Model<
  InferAttributes<Article>,
  InferCreationAttributes<
    Article,
    { omit: "favorited" | "favoritesCount" | "tagList" | "author" }
  >
> {
  declare author?: User;
  declare body: string;
  declare createdAt: CreationOptional<Date>;
  declare description: string;
  declare favorited?: boolean;
  declare favoritesCount?: number;
  declare id: CreationOptional<number>;
  declare slug: string;
  declare tagList?: string[] | Tag[];
  declare title: string;
  declare updatedAt: CreationOptional<Date>;
  declare userId?: ForeignKey<User["id"]>;

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
  declare createFavorite: HasManyCreateAssociationMixin<User, "id">;
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
      id: undefined,
      userId: undefined,
    };
  }
}

const articleModel = (sequelize: Sequelize) => {
  Article.init(
    {
      body: { type: DataTypes.TEXT, allowNull: false },
      createdAt: DataTypes.DATE,
      description: { type: DataTypes.TEXT, allowNull: false },
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      slug: { type: DataTypes.STRING, allowNull: false },
      title: { type: DataTypes.STRING, allowNull: false },
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Article",
    }
  );

  return Article;
};

export default articleModel;
