import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/lib/withAuth";
import db from "@/utils/db";
import Expense from "@/models/Expense";
import { transformDateToISO } from "@/utils/transformDateToISO";
import { verify } from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
import ExpenseType from "@/models/ExpenseType";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { gdi_cookie } = req.cookies;
  const cookie = verify(gdi_cookie!, process.env.JWT_SECRET!);

  if (req.method === "POST") {
    try {
      const { description, hour, type, date, amount } = req.body;

      await db.connect();
      if (isValidObjectId(type._id)) {
        const existType: any = await ExpenseType.findById(type);

        if (existType) {
          const newExpense: any = new Expense({
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
  } else if (req.method === "DELETE") {
    const { expenseId } = req.body;

    await db.connect();
    const expenseDeleted = await Expense.findByIdAndDelete(expenseId);

    await db.disconnect();
    res.json({ msj: "Gasto eliminado correctamente", expenseDeleted });
  } else if ("PUT") {
    try {
      const { expenseId, description, hour, type, amount } = req.body.data;

      await db.connect();
      if (isValidObjectId(expenseId)) {
        const existExpense = await Expense.findById(expenseId);

        if (existExpense) {
          // @ts-ignore
          if (existExpense.userRef.toString() !== cookie?.data?._id) {
            return res.status(401).json({ message: "Unauthorized" });
          }

          const updatedExpense = await Expense.findByIdAndUpdate(
            expenseId,
            {
              description,
              hour,
              type,
              amount,
            },
            { new: true }
          );

          await db.disconnect();
          res.json({ msj: "Gasto actualizado correctamente", updatedExpense });
        }
      }
    } catch (error) {
      res.json({ msj: "Ocurrio un error", error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
