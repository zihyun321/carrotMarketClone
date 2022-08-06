import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
    interface IronSessionData {
        user?: {
            id: number;
        }
    }
}

const cookieOptions = {
    cookieName: "carrotsession",
    password: process.env.COOKIE_PASSWORD!,
};

// API function에서 session을 받아오기 위한 function
export function withApiSession(fn: any) {
    return withIronSessionApiRoute(fn, cookieOptions);
}

// 페이지를 rendering할 때, server side에서 값 받아옴