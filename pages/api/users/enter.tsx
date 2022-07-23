import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phone, email } = req.body;
  const payload = phone ? { phone : +phone } : { email };
  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: "Anonymous",  // create는 name이 필수값이다.
      ...payload,
    },
    update: {}
  });
  console.log(user);
  return res.status(200).end();
}

export default withHandler("POST", handler);
