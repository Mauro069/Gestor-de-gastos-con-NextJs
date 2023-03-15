import { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import { withAuth } from "@/lib/withAuth";
import Expense from "@/models/Expense";
import db from "@/utils/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { reportId } = req.query;

    if (!reportId) {
      res.json({
        msj: "Debes enviar un reportId",
      });
    }

    if (!isValidObjectId(reportId)) {
      res.json({
        msj: "El reportId no es valido",
      });
    }

    try {
      await db.connect();
      const expenses = await Expense.find({
        reportRef: reportId,
      })
        .populate("type")
        .sort({ date: -1 });

      await db.disconnect();
      res.json({ expenses });
    } catch (error) {
      res.json({ msj: "Ocurrio un error", error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
