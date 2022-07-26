import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phone, email } = req.body;
  const user = phone ? { phone : +phone } : { email };
  // const user = await client.user.upsert({
  //   where: {
  //     ...payload,
  //   },
  //   create: {
  //     name: "Anonymous",  // create는 name이 필수값이다.
  //     ...payload,
  //   },
  //   update: {}
  // });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  // Token 및 User 생성 (Token과 User 생성은 한 몸! User upsert 하나로 합쳐줌)
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",  // create는 name이 필수값이다.
            ...user,
          },
        }
      }
    }
  });
  console.log(token);
  return res.status(200).end();
}

export default withHandler("POST", handler);
