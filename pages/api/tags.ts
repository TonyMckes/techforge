import { Tag } from "database/models";
import { apiRouteWithSession } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default apiRouteWithSession(articlesRoute);

async function articlesRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    if (method === "GET") {
      const tags = await Tag.findAll();

      return res.status(200).json({ tags });
    }

    return res.status(402).json("Method nod allowed!");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errors: { body: [error.message] } });
    }
  }
}
