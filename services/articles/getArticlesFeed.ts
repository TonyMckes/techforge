import { Article, User } from "database/models";
import { appendFavorites, appendFollowers } from "lib/helpers";
import { LoggedUser } from "lib/session";
import { tagFilters, userFilters } from "./utils";

interface QueryParams {
  limit?: string;
  offset?: string;
}

//* Feed
async function getArticlesFeed(
  { limit = "3", offset = "0" }: QueryParams,
  loggedUser: LoggedUser | undefined
) {
  const user = await User.findOne({ where: { id: loggedUser?.id || null! } });
  if (!loggedUser || !user) throw new Error("UnauthorizedError");

  const authors = await user.getFollowings();

  const { rows: articles, count: articlesCount } =
    await Article.findAndCountAll({
      include: [tagFilters, userFilters],
      limit: +limit,
      offset: +offset * +limit,
      order: [["createdAt", "DESC"]],
      where: { userId: authors.map((author) => author.id) },
    });

  for (let article of articles) {
    await appendFollowers(article.author!, user);
    await appendFavorites(article, user);
  }

  return { articles, articlesCount };
}

export default getArticlesFeed;
