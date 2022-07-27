import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone : +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok : false }); 
  const payload = Math.floor(100000 + Math.random() * 900000) + ""; // + "" 이란 string으로 바뀜
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
  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
