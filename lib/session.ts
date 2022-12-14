import type { User } from "database/models";
import type { IronSessionOptions } from "iron-session";
import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from "next";

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: "techforge-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

type UserOmittedAttributes = "id" | "password" | "createdAt" | "updatedAt";
export type PlainUser<TOmitted> = Omit<
  ReturnType<User["toJSON"]>,
  keyof TOmitted
>;
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
    isLoggedIn: boolean;
  }
}

export const apiRouteWithSession = (handler: NextApiHandler) => {
  return withIronSessionApiRoute(handler, sessionOptions);
};

export const ssrWithSession = <
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) => {
  return withIronSessionSsr(handler, sessionOptions);
};
