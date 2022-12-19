import { Article, User } from "database/models";
import { appendFavorites, appendFollowers, slugify } from "lib/helpers";
import { LoggedUser } from "lib/session";
import { CreationAttributes } from "sequelize";
import { tagFilters, userFilters } from "./utils";

//* Update Article
async function updateArticle(
  { body, description, slug, title }: CreationAttributes<Article>,
  loggedUser: LoggedUser | undefined
) {
  if (!loggedUser) throw new Error("UnauthorizedError");

  const article = await Article.findOne({
    where: { slug },
    include: [tagFilters, userFilters],
  });
  if (!article) throw new Error("NotFoundError");

  const { author } = article;
  if (loggedUser.id !== author?.id) {
    throw new Error("ForbiddenError");
  }

  if (title) {
    article.slug = slugify(title);
    article.title = title;
  }
  if (description) article.description = description;
  if (body) article.body = body;

  await article.save();

  const user = await User.findOne({ where: { id: loggedUser.id } });
  await appendFollowers(author!, user);
  await appendFavorites(article, user);

  return article;
}

export default updateArticle;
