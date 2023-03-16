import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/lib/withAuth";
import db from "@/utils/db";

import ExpenseType from "@/models/ExpenseType";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, color } = req.body;

    await db.connect();
    const newExpenseType = new ExpenseType({
      name: "Peluqueria",
      color: "FF7A00",
    });

    await newExpenseType.save();
    await db.disconnect();

    res.json({
      msj: "Tipo de gasto creado correctamente",
      expenseType: newExpenseType,
    });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
}

export default withAuth(handler);
