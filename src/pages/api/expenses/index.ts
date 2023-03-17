import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/lib/withAuth";
import db from "@/utils/db";
import Expense from "@/models/Expense";
import { transformDateToISO } from "@/utils/transformDateToISO";
import { verify } from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import ExpenseType from "@/models/ExpenseType";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { gdi_cookie } = req.cookies;
      const cookie = verify(gdi_cookie!, process.env.JWT_SECRET!);

      const { description, hour, type, date, amount } = req.body;

      await db.connect();
      if (isValidObjectId(type._id)) {
        const existType = await ExpenseType.findById(type);

        if (existType) {
          const newExpense = new Expense({
            // @ts-ignore
            userRef: cookie?.data?._id,
            description: description,
            date: transformDateToISO(date, "start"),
            hour,
            type,
            amount,
          });

          await newExpense.save();
          await db.disconnect();
          res.json({ msj: "Gasto cargado correctamente", newExpense });
        }
      }
    } catch (error) {
      res.json({ msj: "Ocurrio un error", error });
    }
  }
}

export default withAuth(handler);
