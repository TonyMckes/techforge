"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
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
