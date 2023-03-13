import { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import { withAuth } from "@/lib/withAuth";
import Report from "@/models/Report";
import db from "@/utils/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { userRef, month, initialMoney } = req.body;

    if (!userRef || !month || !initialMoney) {
      res.json({ msj: "Te falto enviar algun campo" });
    }

    if (!isValidObjectId(userRef)) {
      res.json({
        msj: "El user ref no es valido",
      });
    }

    await db.connect();
    const newReport = new Report({
      userRef,
      month,
      initialMoney,
      currentAmount: initialMoney,
    });

    await newReport.save();
    res.json({ msj: "Reporte creado correctamente", report: newReport });
    await db.disconnect();
  } catch (error) {
    res.status(404).json({ msj: "Ocurrio un error", error });
  }
}

export default withAuth(handler);
