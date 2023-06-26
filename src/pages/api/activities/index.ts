import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/lib/withAuth";
import db from "@/utils/db";
import { transformDateToISO } from "@/utils/transformDateToISO";
import { verify } from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import Activity from "@/models/Activity";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { gdi_cookie } = req.cookies;
  const cookie = verify(gdi_cookie!, process.env.JWT_SECRET!);

  if (req.method === "POST") {
    try {
      const { type, description, userRef, date, amount } = req.body;

      await db.connect();

      // @ts-ignore
      if (isValidObjectId(cookie?.data?._id)) {
        const newActivity: any = new Activity({
          // @ts-ignore
          userRef: cookie?.data?._id,
          description: description,
          date: transformDateToISO(date, "start"),
          type,
          amount,
        });

        await newActivity.save();
        await db.disconnect();
        res.json({ msj: "Movimiento creado correctamente", newActivity });
      }
    } catch (error) {
      res.json({ msj: "Ocurrio un error", error });
    }
  } else if (req.method === "GET") {
    try {
      const { last } = req.query;

      console.log(req.query);

      await db.connect();
      if (last) {
        // @ts-ignore
        const activities = await Activity.find({ userRef: cookie?.data?._id })
          .sort({ date: -1 })
          .limit(5);

        await db.disconnect();

        return res.status(200).json({ activities });
      }

      const activities = await Activity.find({
        // @ts-ignore
        userRef: cookie?.data?._id,
      }).sort({ date: -1 });

      await db.disconnect();

      return res.status(200).json({ activities });
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
