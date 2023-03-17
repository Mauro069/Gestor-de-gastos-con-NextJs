import { NextApiRequest, NextApiResponse } from "next";
import User, { IUserSchema } from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
  const { email, password, firstname, lastname } = req.body;

  try {
    const user = await User?.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ msj: "Ya existe un usuario con ese email" });
    }

    if (!email || !password || !firstname || !lastname) {
      return res.status(400).json({ msj: "Te falto enviar algun campo" });
    }

    bcrypt.hash(password, 10, async (error, hashedPassword) => {
      if (error) return res.status(500).json({ error });

      const newUser: IUserSchema = new User({
        email,
        password: hashedPassword,
        firstname,
        lastname,
      });

      try {
        await newUser.save();

        // @ts-ignore
        const { password, ...rest } = newUser._doc;

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
        res.status(201).json({
          ok: true,
          msj: "Usuario creado correctamente",
          user: rest,
          token,
        });
      } catch (error) {
        return res.status(500).json({ error });
      }
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
