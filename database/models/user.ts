import {
  Association,
  CreationOptional,
  DataTypes,
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
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { Article, AssociatesTypes, Comment, ConnectionInstance } from ".";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User, { omit: "followersCount" | "following" }>
> {
  declare bio: string | null;
  declare createdAt: CreationOptional<Date>;
  declare email: string;
  declare followersCount?: number;
  declare following?: boolean;
  declare id: CreationOptional<number>;
  declare image: string | null;
  declare password: string;
  declare updatedAt: CreationOptional<Date>;
  declare username: string;

  // Article
  declare addArticle: HasManyAddAssociationMixin<Article, number>;
  declare createArticle: HasManyCreateAssociationMixin<Article, "userId">;
  declare hasArticle: HasManyHasAssociationMixin<Article, number>;
  declare removeArticle: HasManyRemoveAssociationMixin<Article, number>;

  declare addArticles: HasManyAddAssociationsMixin<Article, number>;
  declare countArticles: HasManyCountAssociationsMixin;
  declare getArticles: HasManyGetAssociationsMixin<Article>;
  declare hasArticles: HasManyHasAssociationsMixin<Article, number>;
  declare removeArticles: HasManyRemoveAssociationsMixin<Article, number>;
  declare setArticles: HasManySetAssociationsMixin<Article, number>;

  // Comment
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

  // Favorites
  declare addFavorite: HasManyAddAssociationMixin<Article, number>;
  declare createFavorite: HasManyCreateAssociationMixin<Article, "userId">;
  declare hasFavorite: HasManyHasAssociationMixin<Article, number>;
  declare removeFavorite: HasManyRemoveAssociationMixin<Article, number>;

  declare addFavorites: HasManyAddAssociationsMixin<Article, number>;
  declare countFavorites: HasManyCountAssociationsMixin;
  declare getFavorites: HasManyGetAssociationsMixin<Article>;
  declare hasFavorites: HasManyHasAssociationsMixin<Article, number>;
  declare removeFavorites: HasManyRemoveAssociationsMixin<Article, number>;
  declare setFavorites: HasManySetAssociationsMixin<Article, number>;

  // Followers
  declare addFollower: HasManyAddAssociationMixin<User, number>;
  declare createFollower: HasManyCreateAssociationMixin<User, "id">;
  declare hasFollower: HasManyHasAssociationMixin<User, number>;
  declare removeFollower: HasManyRemoveAssociationMixin<User, number>;

  declare addFollowers: HasManyAddAssociationsMixin<User, number>;
  declare countFollowers: HasManyCountAssociationsMixin;
  declare getFollowers: HasManyGetAssociationsMixin<User>;
  declare hasFollowers: HasManyHasAssociationsMixin<User, number>;
  declare removeFollowers: HasManyRemoveAssociationsMixin<User, number>;
  declare setFollowers: HasManySetAssociationsMixin<User, number>;

  // Followings
  declare addFollowing: HasManyAddAssociationMixin<User, number>;
  declare createFollowing: HasManyCreateAssociationMixin<User, "id">;
  declare hasFollowing: HasManyHasAssociationMixin<User, number>;
  declare removeFollowing: HasManyRemoveAssociationMixin<User, number>;
  //
  declare addFollowings: HasManyAddAssociationsMixin<User, number>;
  declare countFollowings: HasManyCountAssociationsMixin;
  declare getFollowings: HasManyGetAssociationsMixin<User>;
  declare hasFollowings: HasManyHasAssociationsMixin<User, number>;
  declare removeFollowings: HasManyRemoveAssociationsMixin<User, number>;
  declare setFollowings: HasManySetAssociationsMixin<User, number>;

  static associate({ Article, Comment, User }: AssociatesTypes) {
    // Article
    this.hasMany(Article, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    // Comments
    this.hasMany(Comment, {
      foreignKey: "articleId",
    });

    // Favorites
    this.belongsToMany(Article, {
      through: "Favorites",
      as: "favorites",
      foreignKey: "userId",
      timestamps: false,
    });

    // Followers
    this.belongsToMany(User, {
      through: "Followers",
      as: { singular: "follower", plural: "followers" },
      foreignKey: "userId",
      timestamps: false,
    });
    this.belongsToMany(User, {
      through: "Followers",
      as: { singular: "following", plural: "followings" },
      foreignKey: "followerId",
      timestamps: false,
    });
  }

  declare static associations: {
    articles: Association<User, Article>;
    comments: Association<User, Comment>;
    favorites: Association<User, Article>;
    followers: Association<User, User>;
    following: Association<User, User>;
  };

  toJSON() {
    return {
      ...this.get(),
      createdAt: undefined,
      following: false,
      id: undefined,
      password: undefined,
      updatedAt: undefined,
    };
  }
}

const userModel = (sequelize: ConnectionInstance) => {
  User.init(
    {
      bio: { type: DataTypes.TEXT, allowNull: true },
      createdAt: DataTypes.DATE,
      email: DataTypes.STRING,
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      image: { type: DataTypes.TEXT, allowNull: true },
      password: DataTypes.STRING,
      updatedAt: DataTypes.DATE,
      username: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};

export default userModel;
