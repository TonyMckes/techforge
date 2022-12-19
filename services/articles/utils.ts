import { Tag, User } from "database/models";

export const tagFilters = {
  model: Tag,
  as: "tagList",
  attributes: ["name"],
};
export const userFilters = {
  model: User,
  as: "author",
  attributes: { exclude: ["email"] },
};
