import { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import { withAuth } from "@/lib/withAuth";
import Report from "@/models/Report";
import db from "@/utils/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    let userId = req.query.userId;

    if (!userId) {
      res.json({
        msj: "Debes enviar un userId",
      });
    }

    if (!isValidObjectId(userId)) {
      res.json({
        msj: "El userId no es valido",
      });
    }

    await db.connect();

    const reports = await Report.find({ userRef: userId }).sort({
      createdAt: -1,
    });
    await db.disconnect();
    res.json({ reports });
  } catch (error) {
    res.status(404).json({ msj: "Ocurrio un error", error });
  }
}

export default withAuth(handler);
