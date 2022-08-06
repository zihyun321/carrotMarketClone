import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) : Promise<any> {
    const profile = await client.user.findUnique({
        where: { id: req.session.user?.id },
    })
    res.json({
        ok: true,
        profile
    })
}

export default withApiSession( withHandler("POST", handler));
