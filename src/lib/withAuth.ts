import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { jwtVerify } from "jose";

export const withAuth =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const accessCookie = req.cookies.gdi_cookie;

    if (!accessCookie) {
      return res.status(401).json({ message: "No estas autorizado" });
    }

    try {
      await jwtVerify(
        accessCookie,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
    } catch (err) {
      return res.status(401).json({ message: "No estas autorizado" });
    }

    return handler(req, res);
  };
