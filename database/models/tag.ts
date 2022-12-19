import {
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
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import type { Article, AssociatesTypes, ConnectionInstance } from ".";

export class Tag extends Model<
  InferAttributes<Tag>,
  InferCreationAttributes<Tag>
> {
  declare name: string;

  declare articleId: ForeignKey<Article["id"]>;

  // Article
  declare addArticle: HasManyAddAssociationMixin<Article, number>;
  declare createArticle: HasManyCreateAssociationMixin<Article, "id">;
  declare hasArticle: HasManyHasAssociationMixin<Article, number>;
  declare removeArticle: HasManyRemoveAssociationMixin<Article, number>;

  declare addArticles: HasManyAddAssociationsMixin<Article, number>;
  declare countArticles: HasManyCountAssociationsMixin;
  declare getArticles: HasManyGetAssociationsMixin<Article>;
  declare hasArticles: HasManyHasAssociationsMixin<Article, number>;
  declare removeArticles: HasManyRemoveAssociationsMixin<Article, number>;
  declare setArticles: HasManySetAssociationsMixin<Article, number>;

  static associate({ Article }: AssociatesTypes) {
    this.belongsToMany(Article, {
      as: { plural: "articles", singular: "article" },
      foreignKey: "tagName",
      through: "TagList",
      timestamps: false,
    });
  }

  toJSON(): NonAttribute<string> {
    return this.name;
  }
}

const tagModel = (sequelize: ConnectionInstance) => {
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
