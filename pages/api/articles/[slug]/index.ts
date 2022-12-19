import { apiRouteWithSession } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import deleteArticle from "services/articles/deleteArticle";
import getArticle from "services/articles/getArticle";

export default apiRouteWithSession(usersRoute);

async function usersRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { slug } = req.query;
  const { user } = req.session;

  try {
    if (method === "GET") {
      const article = await getArticle(slug as string, user);

      return res.json({ article });
    }

    if (method === "DELETE") {
      await deleteArticle(slug as string, user);

      return res.json({ message: { body: ["Article deleted successfully"] } });
    }

    res.status(405).json("Method Not Allowed");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errors: { body: [error.message] } });
    }
  }
}
