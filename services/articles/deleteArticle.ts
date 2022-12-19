import { Article } from "database/models";
import { LoggedUser } from "lib/session";
import { tagFilters, userFilters } from "./utils";

//* Delete Article
async function deleteArticle(slug: string, loggedUser: LoggedUser | undefined) {
  if (!loggedUser) throw new Error("UnauthorizedError");
  if (!slug || slug.length === 0) throw new Error("Missing slug");

  const article = await Article.findOne({
    where: { slug },
    include: [tagFilters, userFilters],
  });
  if (!article) throw new Error("NotFoundError");

  const { id: authorId } = await article.getAuthor();

  if (loggedUser.id !== authorId) {
    throw new Error("ForbiddenError");
  }

  await article.destroy();
}

export default deleteArticle;
