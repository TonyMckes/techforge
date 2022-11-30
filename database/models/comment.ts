import {
  CreationOptional,
  DataTypes,
  ForeignKey,
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

  static associate({ Article, User }: AssociatesTypes) {
      // Comments
      this.belongsTo(Article, { foreignKey: "articleId" });
      this.belongsTo(User, { as: "author", foreignKey: "userId" });
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
