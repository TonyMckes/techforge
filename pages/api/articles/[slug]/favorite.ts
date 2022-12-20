import { appendFavorites } from "lib/helpers";
import { apiRouteWithSession } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";
import getArticle from "services/articles/getArticle";

export default apiRouteWithSession(usersRoute);

async function usersRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;
  const { slug } = req.query;
  const { user } = req.session;

  try {
    if (!user) {
      return res.status(401).json({ errors: { body: ["UnauthorizedError"] } });
    }

    const article = await getArticle(slug as string, user);
    if (!article) throw new Error("NotFoundError");

    if (method === "POST" || method === "DELETE") {
      if (method === "POST") await article.addFavorite(article.author);
      if (method === "DELETE") await article.removeFavorite(article.author);

      await appendFavorites(article, article.author);

      return res.json({ article });
    }

    res.status(405).json("Method Not Allowed");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errors: { body: [error.message] } });
    }
  }
}
