import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { ConnectionInstance, TagAssociates } from "./model-types";

const tagModel = (sequelize: ConnectionInstance) => {
  class Tag extends Model<InferAttributes<Tag>, InferCreationAttributes<Tag>> {
    static associate({ Article }: TagAssociates) {
      // Tag list
      this.belongsToMany(Article, {
        through: "TagList",
        foreignKey: "tagName",
        timestamps: false,
      });
    }

    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        userId: undefined,
        TagList: undefined,
      };
    }
  }

  Tag.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "Tag",
      timestamps: false,
    }
  );

  return Tag;
};

export default tagModel;
