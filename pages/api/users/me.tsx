import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

declare module "iron-session" {
    interface IronSessionData {
        user?: {
            id: number;
        }
    }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) : Promise<any> {
    console.log(req.session.user);
    const profile = await client.user.findUnique({
        where: { id: req.session.user?.id },
    })
    res.json({
        ok: true,
        profile
    })
}

export default withIronSessionApiRoute( withHandler("GET", handler) , {
    cookieName: "carrotsession",
    password: process.env.COOKIE_PASSWORD!
} );
