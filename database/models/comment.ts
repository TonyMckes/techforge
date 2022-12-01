import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { Article, AssociatesTypes, ConnectionInstance, User } from ".";

export class Comment extends Model<
    InferAttributes<Comment>,
    InferCreationAttributes<Comment>
  > {
  declare id?: CreationOptional<number>;
  declare body: string;

  declare articleId: ForeignKey<Article["id"]>;
  declare userId: ForeignKey<User["id"]>;

  // Article
  declare createArticle: HasOneCreateAssociationMixin<Article>;
  declare getArticle: HasOneGetAssociationMixin<Article>;
  declare setArticle: HasOneSetAssociationMixin<Article, number>;

  // Author
  declare createAuthor: HasOneCreateAssociationMixin<User>;
  declare getAuthor: HasOneGetAssociationMixin<User>;
  declare setAuthor: HasOneSetAssociationMixin<User, number>;
  static associate({ Article, User }: AssociatesTypes) {
    // Article
    this.belongsTo(Article, {
      as: "article",
      foreignKey: "articleId",
    });

    // Author
    this.belongsTo(User, {
      as: "author",
      foreignKey: "userId",
    });
    }

    toJSON() {
      return {
        ...this.get(),
        articleId: undefined,
        userId: undefined,
      };
    }
  }

const commentModel = (sequelize: ConnectionInstance) => {
  Comment.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      body: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );

  return Comment;
};

export default commentModel;
