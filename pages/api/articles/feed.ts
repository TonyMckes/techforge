import { apiRouteWithSession } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import getArticlesFeed from "services/articles/getArticlesFeed";

export default apiRouteWithSession(articlesFeedRoute);

async function articlesFeedRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { user } = req.session;

  try {
    if (method === "GET") {
      const { articles, articlesCount } = await getArticlesFeed(query, user);

      return res.json({ articles, articlesCount });
    }

    return res.status(402).json("Method nod allowed!");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errors: { body: [error.message] } });
    }
  }
}
