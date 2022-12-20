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
    if (method === "POST" || method === "DELETE") {
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
      if (!profile) throw new Error("NotFoundError");

      if (method === "POST") await profile.addFollower(loggedUser!);
      if (method === "DELETE") await profile.removeFollower(loggedUser!);

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
