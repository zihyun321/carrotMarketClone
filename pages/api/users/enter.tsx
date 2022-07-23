import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phone, email } = req.body;
  let user;
  if (email) {
    user = await client.user.findUnique({
      where: {
        email: email  // === email,
      }
    });
    if (user) {
      console.log("Found it!");
    }
    if (!user) {
      console.log("Did not found. will create");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          email,
        }
      })
    }
    console.log(user);
  }
  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone,  // + 붙여야 string에서 number로 변환된다. (만약 num -> string 경우는 number + "")
      }
    });
    if (user) {
      console.log("Found it!");
    }
    if (!user) {
      console.log("Did not found. will create");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          phone: +phone,
        }
      })
    }
    console.log(user);
  }
  return res.status(200).end();
}

export default withHandler("POST", handler);
