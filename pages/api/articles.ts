import { apiRouteWithSession } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import createArticle from "services/articles/createArticle";
import getArticles from "services/articles/getArticles";

export default apiRouteWithSession(articlesRoute);

async function articlesRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const { user } = req.session;

  try {
    // Create article
    if (method === "POST") {
      const article = await createArticle({
        loggedUser: user,
        ...body.article,
      });

      return res.json({ article });
    }

    return res.status(402).json("Method nod allowed!");
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
