import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/lib/withAuth";
import db from "@/utils/db";

import ExpenseType from "@/models/ExpenseType";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { ids } = req.query;
    // @ts-ignore
    const idsArr = ids?.includes("-") ? ids.split("-") : ids;

    try {
      await db.connect();
      const expenseTypes = idsArr
        ? await ExpenseType.find({ _id: { $in: idsArr } })
        : await ExpenseType.find();

      res.json({
        expenseTypes,
      });
      await db.disconnect();
    } catch (error) {
      res.json({ msj: "Ocurrio un error", error });
    }
  } else if (req.method === "POST") {
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
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
