import { apiRouteWithSession } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import createComment from "services/comments/createComment";

export default apiRouteWithSession(usersRoute);

async function usersRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;
  const { slug, commentId } = query;
  const { user } = req.session;

  try {
    if (method === "POST") {
      const comment = await createComment({ slug, ...body.comment }, user);

      return res.json({ comment });
    }

    res.status(405).json("Method Not Allowed");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errors: { body: [error.message] } });
    }
  }
}