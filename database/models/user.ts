import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { Article, AssociatesTypes, Comment, ConnectionInstance } from ".";

export class User extends Model<
    InferAttributes<User>,
    InferCreationAttributes<User>
  > {
  declare id?: CreationOptional<number>;
  declare email: string;
  declare username: string;
  declare bio: string;
  declare image: string;
  declare password: string;

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

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        password: undefined,
        updatedAt: undefined,
        createdAt: undefined,
      };
    }
  }

const userModel = (sequelize: ConnectionInstance) => {
  User.init(
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      bio: DataTypes.TEXT,
      image: DataTypes.TEXT,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};

export default userModel;
