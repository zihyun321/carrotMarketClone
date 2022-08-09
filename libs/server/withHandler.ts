// nextJS api route륾 만들때면, function을 export default 해야한다.
// 만약에 export default 하지 않는다면, 누군가 api에 접속했을때 nextJS에 의해 호출되지 않을것이다

import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
    ok: boolean;
    [key: string]: any;
}

interface ConfigType {
    method:"GET"|"POST"|"DELETE", 
    handler: (req: NextApiRequest, res: NextApiResponse) => void,
    isPrivate?: boolean
}
export default function withHandler({
    method, 
    isPrivate = true, 
    handler
}: ConfigType) {
    // ** 명시해야할점: 무조건 nextJS가 바로 실행할 function을 Return 해주어야 한다.
    return async function(req: NextApiRequest, res: NextApiResponse){
        if (req.method !== method) {
            return res.status(405).end();
        }
        if (isPrivate && !req.session.user) {
            res.status(401).json({ ok: false, error: "Plz Login" });
        } 
        try {
            await handler(req, res);
        } catch(error) {
            console.log(error);
            return res.status(500).json({error});
        }
    }
}