import { Article, User } from "database/models";
import { appendFollowers } from "lib/helpers";
import { LoggedUser } from "lib/session";

async function getComments(slug: string, loggedUser: LoggedUser | undefined) {
  const article = await Article.findOne({ where: { slug } });
  if (!article) throw new Error("NotFoundError");

  const comments = await article.getComments({
    include: [
      {
        model: User,
        as: "author",
        attributes: { exclude: ["email"] },
      },
    ],
  });

  const user = await User.findOne({ where: { id: loggedUser?.id } });
  for (const comment of comments) {
    await appendFollowers(comment.author!, user);
  }

  return comments;
}

export default getComments;
