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
    const { token } = req.body;
    const exists = await client.token.findUnique({ 
        where: {
            payload: token
        }
    });
    if (!exists) return res.status(400).end();
    console.log('exists: ', exists);
    req.session.user = {
        id: exists.userId,
    };
    await req.session.save();
    res.status(200).end();
}

export default withIronSessionApiRoute( withHandler("POST", handler) , {
    cookieName: "carrotsession",
    password: process.env.COOKIE_PASSWORD!
} );
