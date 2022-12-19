import { Article, User } from "database/models";
import { appendFavorites, appendFollowers } from "lib/helpers";
import { LoggedUser } from "lib/session";
import { HasManyGetAssociationsMixinOptions } from "sequelize";
import { tagFilters, userFilters } from "./utils";

interface QueryParams {
  author?: string;
  tag?: string;
  favorited?: boolean;
  limit?: number;
  offset?: number;
}

//? All Articles - by Author/by Tag/Favorited by user
async function getArticles(
  { author, tag, favorited, limit = 3, offset = 0 }: QueryParams,
  loggedUser: LoggedUser | undefined
): Promise<{ articles: Article[]; articlesCount: number }> {
  const searchOptions: HasManyGetAssociationsMixinOptions = {
    include: [
      { ...tagFilters, ...(tag && { where: { name: tag } }) },
      { ...userFilters, ...(author && { where: { username: author } }) },
    ],
    limit: +limit,
    offset: +offset * +limit,
    order: [["createdAt", "DESC"]],
  };

  let articles: Article[] = [];
  let articlesCount: number = 0;

  if (favorited) {
    const user = await User.findOne({ where: { username: favorited } });
    if (!user) throw new Error("user not found");

    articles = await user.getFavorites(searchOptions);
    articlesCount = await user.countFavorites();
  } else {
    const { count, rows } = await Article.findAndCountAll(searchOptions);

    [articles, articlesCount] = [rows, count];
  }
  const user = await User.findOne({ where: { id: loggedUser?.id } });
  for (let article of articles) {
    await appendFollowers(article.author!, user);
    await appendFavorites(article, user);
  }

  return { articles, articlesCount };
}

export default getArticles;
