import { Comment } from "database/models";
import { LoggedUser } from "lib/session";

async function deleteComment(
  commentId: string,
  loggedUser: LoggedUser | undefined
) {
  if (!loggedUser) throw new Error("UnauthorizedError");

  const comment = await Comment.findByPk(commentId);
  if (!comment) throw new Error("NotFoundError");

  if (comment.userId !== loggedUser.id) {
    throw new Error("ForbiddenError");
  }

  await comment.destroy();
}

export default deleteComment;
