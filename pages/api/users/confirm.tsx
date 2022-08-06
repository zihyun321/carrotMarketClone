import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";

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
    // req.body에 token 담아 보냄
    const { token } = req.body;
    
    // DB에서 해당 token 찾음
    const foundToken = await client.token.findUnique({ 
        where: {
            payload: token
        }
    });

    if (!foundToken) return res.status(404).end();
    
    // token이 있다면 해당 Token을 보유한 유저의 id를 req.session.user에 넣을 것
    req.session.user = {
        id: foundToken.userId,
    };
    await req.session.save();
    
    // token 확인후 token 삭제해버리기 (token 전부를 가지고 있을 필요 없으니까)
    await client.token.deleteMany({
        where: {
            userId: foundToken.userId
        }
    })
    // front-end API로부터 ok:true를 받았다는 건, user를 home 페이지 같은 곳으로 redirect 해야한다는 뜻
    res.json({
        ok: true
    })
}

// req.session.user/save/destory를 사용하기 위해서 앞으로 다음 function만 추가하면 됨
export default withApiSession( withHandler("POST", handler));
