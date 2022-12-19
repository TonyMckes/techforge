import { Article, User } from "database/models";
import { appendFavorites, appendFollowers } from "lib/helpers";
import { tagFilters, userFilters } from "./utils";

// Single Article by slug
async function getArticle({
  slug,
  loggedUser,
}: {
  slug: string;
  loggedUser: User | null;
}) {
  const article = await Article.findOne({
    where: { slug: slug },
    include: [tagFilters, userFilters],
  });
  if (!article) throw new Error("NotFoundError");

  await appendFollowers(article.author!, loggedUser);
  await appendFavorites(article, loggedUser);

  return article;
}

export default getArticle;
