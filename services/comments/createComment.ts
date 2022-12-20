import { Article, Comment, User } from "database/models";
import { appendFollowers } from "lib/helpers";
import { LoggedUser } from "lib/session";

interface Params {
  slug: string;
  body: string;
}

async function createComment(
  { body, slug }: Params,
  loggedUser: LoggedUser | undefined
) {
  if (!body && body.length === 0) throw new Error("FieldRequiredError");
  if (!loggedUser) throw new Error("UnauthorizedError");

  const article = await Article.findOne({ where: { slug } });
  if (!article) throw new Error("NotFoundError");

  const comment = await Comment.create({
    body: body,
    articleId: article.id,
    userId: loggedUser.id,
  });

  const user = await User.findOne({ where: { id: loggedUser.id } });
  await appendFollowers(user!, user);
  comment.setDataValue("author", user!);

  return comment;
}

export default createComment;
