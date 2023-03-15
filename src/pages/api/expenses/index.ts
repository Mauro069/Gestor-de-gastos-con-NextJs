import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/lib/withAuth";
import db from "@/utils/db";
import Expense from "@/models/Expense";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await db.connect();

    const expenses = await Expense.find({
      userRef: "64121df34b2cf0f7fab430ca",
    }).sort({
      createdAt: -1,
    });
    await db.disconnect();
    res.json({ expenses });
  } else if (req.method === "POST") {
    try {
      await db.connect();
      const newExpense = new Expense({
        userRef: "64121df34b2cf0f7fab430ca",
        description: "Compre ropitaa  otra vez (?",
        date: "06-03-2023",
        type: "64121ff64b2cf0f7fab430cf",
        amount: 45000,
      });
      console.log({ newExpense });

      await newExpense.save();
      await db.disconnect();
      res.json({ msj: "Gasto cargado correctamente", expense: newExpense });
    } catch (error) {
      res.json({ msj: "Ocurrio un error", error });
    }
  }
}

export default withAuth(handler);
