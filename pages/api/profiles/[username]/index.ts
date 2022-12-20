import { User } from "database/models";
import { apiRouteWithSession } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";

export default apiRouteWithSession(usersRoute);

async function usersRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { username } = query;

  try {
    if (method === "GET") {
      const profile = await User.findOne({ where: { username } });

      return res.json({ profile });
    }

    res.status(405).json("Method Not Allowed");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errors: { body: [error.message] } });
    }
  }
}
