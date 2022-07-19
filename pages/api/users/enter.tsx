import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**
   * 만약 req.body가 {"email": "test@test.com"}일 경우
   * req.body.email로 출력하면 undefined가 뜰 것이다.
   * 왜냐면 req.body는 req의 내용을 기준으로 parse되기 때문이다.
   * 이걸 해결하려면 프론트엔드에서 header 설정을 해야한다. (application/json)
   */
  console.log(req.body);
  
  // 응답을 Return 하기전 method 확인 필요 (GET 요청일 경우 정상이라고 응답을 보내면 안되기 때문)
  if (req.method !== "POST") {
    res.status(401).end();
  }
  res.status(200).end();
  // res.json({ ok:true });
}
