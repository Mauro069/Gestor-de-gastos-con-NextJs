import { serialize } from "cookie";
import { NextApiResponse } from "next";

export default function clearCookie(res: NextApiResponse, cookieName: string) {
  const cookieSerialized = serialize(cookieName, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookieSerialized);
}
