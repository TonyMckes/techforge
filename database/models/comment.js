"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
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
