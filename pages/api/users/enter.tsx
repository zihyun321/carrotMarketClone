import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phone, email } = req.body;
  const user = await client.user.upsert({
    where: {
      ...(phone && { phone: +phone }),  // ...()은 if else와 같은 로직
      ...(email && { email }),
    },
    create: {
      name: "Anonymous",  // create는 name이 필수값이다.
      ...(phone && { phone: +phone }),
      ...(email && { email }),
    },
    update: {}
  });
  console.log(user);
  return res.status(200).end();
}

export default withHandler("POST", handler);
