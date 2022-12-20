import { User } from "database/models";
import { appendFollowers } from "lib/helpers";
import { apiRouteWithSession } from "lib/session";
import type { NextApiRequest, NextApiResponse } from "next";

export default apiRouteWithSession(usersRoute);

async function usersRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { username } = query;
  const { user } = req.session;

  try {
    if (method === "GET") {
      if (!user) {
        return res
          .status(401)
          .json({ errors: { body: ["UnauthorizedError"] } });
      }
      const loggedUser = await User.findOne({ where: { id: user.id } });
      const profile = await User.findOne({
        where: { username },
        attributes: { exclude: ["email"] },
      });
      if (!profile) {
        return res.status(403).json({ errors: { body: ["NotFound"] } });
      }

      await appendFollowers(profile, loggedUser);

      return res.json({ profile });
    }

    res.status(405).json("Method Not Allowed");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errors: { body: [error.message] } });
    }
  }
}
