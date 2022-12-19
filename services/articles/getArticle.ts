import { Article, User } from "database/models";
import { appendFavorites, appendFollowers } from "lib/helpers";
import { LoggedUser } from "lib/session";
import { tagFilters, userFilters } from "./utils";

// Single Article by slug
async function getArticle(slug: string, loggedUser?: LoggedUser) {
  const article = await Article.findOne({
    where: { slug: slug },
    include: [tagFilters, userFilters],
  });
  if (!article) throw new Error("NotFoundError");

  const user = await User.findOne({ where: { id: loggedUser?.id || null! } });
  await appendFollowers(article.author!, user);
  await appendFavorites(article, user);

  return article;
}

export default getArticle;
