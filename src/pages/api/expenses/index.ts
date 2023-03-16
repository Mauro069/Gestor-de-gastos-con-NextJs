import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/lib/withAuth";
import db from "@/utils/db";
import Expense from "@/models/Expense";
import { transformDateToISO } from "@/utils/transformDateToISO";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      await db.connect();
      const newExpense = new Expense({
        userRef: "64121df34b2cf0f7fab430ca",
        description: "Burgers",
        date: transformDateToISO("13-03-2023", "start"),
        type: "64126a713045b55771427ee0",
        amount: 25000,
      });

      await newExpense.save();

      // const expense = await Expense.find({
      //   type: "64126a713045b55771427ee0",
      // });
      await db.disconnect();
      res.json({ msj: "Gasto cargado correctamente", newExpense });
    } catch (error) {
      res.json({ msj: "Ocurrio un error", error });
    }
  }
}

export default withAuth(handler);
