import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "@/models/User";
import db from "@/utils/db";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await db.connect();
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({ msj: "Debes enviar un email y contraseña" });
    }

    const user: IUser | null = await User?.findOne({ email });

    if (!user) {
      return res.json({ msj: "Usuario no encontrado" });
    }

    const isCorrect: boolean = await bcrypt.compare(password, user.password);

    if (isCorrect) {
      // @ts-ignore
      const { password, ...rest } = user._doc;

      const token = jwt.sign({ data: rest }, process.env.JWT_SECRET!, {
        expiresIn: 86400,
      });

      const serialized = serialize("gdi_cookie", token, {
        // Solo se puede acceder desde HTTP, osea que el navegador no lo va a mostrar
        httpOnly: false,
        // Solo se activa si esta en produccion
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 86400,
        path: "/",
      });

      res.setHeader("Set-cookie", serialized);

      await db.disconnect();
      res.json({
        ok: true,
        msj: "Usuario logeado correctamente",
        user: rest,
        token,
      });
    } else {
      return res.json({ msj: "Contraseña incorrecta" });
    }
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
}
