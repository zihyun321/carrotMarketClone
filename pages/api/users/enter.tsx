import mail from "@sendgrid/mail"
import twilio from "twilio";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";

mail.setApiKey(process.env.SENDGRID_APIKEY!);
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

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
  // user가 phone번호 입력했을때 메세지 발송 (단, 여기선 내 핸드폰으로만 메세지가 가도록)
  if (phone) {
    // await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MSID,
    //   to: process.env.TWILIO_PHONE!,  // ! 붙이면 이건 확실히 존재하는 변수다.
    //   body: `Your login token is ${payload}`,
    // });  
  } else if (email) {
    // const email = await mail.send({
    //   from: "ziihyun321@gmail.com",
    //   to: "ziihyun321@gmail.com",
    //   subject: "Your Carrot Market Verification Email",
    //   text: `Your token is ${payload}`,
    //   html: `<strong>Your token is ${payload}</strong>`
    // });
    // console.log('email: ', email);
  }
  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
