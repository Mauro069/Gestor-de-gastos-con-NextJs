import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import clearCookie from "@/utils/clearCookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { gdi_cookie } = req.cookies;

    if (gdi_cookie) {
      const payload = verify(gdi_cookie, process.env.JWT_SECRET!);
      if (!payload) clearCookie(res, "gdi_cookie");

      // @ts-ignore
      res.status(200).json({ user: payload.data, isValid: true });
    }
  } catch (error) {
    clearCookie(res, "gdi_cookie");
  }
}
