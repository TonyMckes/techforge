import { Article, User } from "../database/models";

export const slugify = (string: string) => {
  return string.trim().toLowerCase().replace(/\W|_/g, "-");
};

export const appendFavorites = async (
  article: Article,
  loggedUser?: User | null
) => {
  const favorited = await article.hasFavorite(loggedUser || null!);
  const favoritesCount = await article.countFavorites();

  article.setDataValue("favorited", favorited);
  article.setDataValue("favoritesCount", favoritesCount);
  return { favorited, favoritesCount };
};

export const appendFollowers = async (
  author: User,
  loggedUser?: User | null
) => {
  const following = await author.hasFollower(loggedUser || null!);
  const followersCount = await author.countFollowers();
  author.setDataValue("followersCount", followersCount);
  author.setDataValue("following", following);

  return { following, followersCount };
};

