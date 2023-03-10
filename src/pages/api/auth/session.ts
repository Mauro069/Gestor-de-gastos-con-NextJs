import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { gdi_cookie } = req.cookies;

  if (gdi_cookie) {
    const payload = verify(gdi_cookie, process.env.JWT_SECRET!);
    
    if (!payload) {
      const serialized = serialize("gdi_cookie", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 0,
        path: "/",
      });

      res.setHeader("Set-Cookie", serialized);
      res.status(200).json({ msg: "🧐" });
    }
    // @ts-ignore
    res.status(200).json({ user: payload.data, isValid: true });
  }
}
