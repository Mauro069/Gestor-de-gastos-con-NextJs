import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/lib/withAuth";
import Expense from "@/models/Expense";
import db from "@/utils/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { day } = req.query;

    try {
      await db.connect();
      const expenses = await Expense.find({
        date: day,
      }).populate("type")
      
      res.json({
        expenses,
      });
      await db.disconnect();
    } catch (error) {
      res.json({ msj: "Ocurrio un error", error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
