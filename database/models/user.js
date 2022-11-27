"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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
