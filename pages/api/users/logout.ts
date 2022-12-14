import { apiRouteWithSession } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";

export default apiRouteWithSession(usersRoute);

async function usersRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method, session } = req;

  try {
    if (method === "POST") {
      session.isLoggedIn = false;
      session.destroy();

      return res.json({ user: session.user });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errors: { body: [error.message] } });
    }
  }

  res.status(405).json("Method Not Allowed");
}
