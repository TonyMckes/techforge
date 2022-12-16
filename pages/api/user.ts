import { apiRouteWithSession } from "lib/session";
import { NextApiRequest, NextApiResponse } from "next";
import updateUser from "services/users/updateUser";

export default apiRouteWithSession(usersRoute);

async function usersRoute(req: NextApiRequest, res: NextApiResponse) {
  const { method, session } = req;
  const { user: userData } = req.body;

  try {
    if (method === "GET") {
      const { user } = session;
      if (!user) throw new Error("You need to login first!");

      return res.status(200).json({ user });
    }

    if (method === "PUT") {
      if (!session.user) throw new Error("You need to login first!");
      const user = await updateUser(userData, session.user);

      session.user = user;
      await session.save();

      return res.status(200).json({ user });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ errors: { body: [error.message] } });
    }
  }

  res.status(405).json("Method Not Allowed");
}
