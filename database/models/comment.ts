import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { CommentAssociates, ConnectionInstance } from "./model-types";

const commentModel = (sequelize: ConnectionInstance) => {
  class Comment extends Model<
    InferAttributes<Comment>,
    InferCreationAttributes<Comment>
  > {
    static associate({ Article, User }: CommentAssociates) {
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
