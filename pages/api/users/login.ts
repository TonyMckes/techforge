import { apiRouteWithSession } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import userLogin from "services/users/userLogin";

export default apiRouteWithSession(usersRoute);

async function usersRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method, session } = req;
  const { user: userData } = req.body;

  try {
    if (method === "POST") {
      const user = await userLogin(userData);

      session.user = user.toJSON();
      session.isLoggedIn = true;
      await session.save();

      return res.json({ user });
    }

    res.status(405).json("Method Not Allowed");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errors: { body: [error.message] } });
    }
  }
}
