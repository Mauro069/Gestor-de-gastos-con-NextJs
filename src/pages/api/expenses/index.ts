import { NextApiRequest, NextApiResponse } from "next";
import { isValidObjectId } from "mongoose";
import { withAuth } from "@/lib/withAuth";
import Report from "@/models/Report";
import db from "@/utils/db";
import Expense from "@/models/Expense";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { reportRef, description, date, type, amount } = req.body;

    /* if (!reportRef || !description || !date || !type || !amount) {
      return res.json({ msj: "Te falto enviar algun campo" });
    }
*/
    if (!isValidObjectId("6411f1e28ff1749bb7adb5f4")) {
      return res.json({
        msj: "El report ref  no es valido",
      });
    }

    if (!isValidObjectId("633349f9abd6717ef39b24fe")) {
      return res.json({
        msj: "El  tipo de gasto no es valido",
      });
    }

    await db.connect();
    const newExpense = new Expense({
      reportRef: "6411f1e28ff1749bb7adb5f4",
      description: "Descripcion",
      date: "2023-10-23",
      type: "633349f9abd6717ef39b24fe",
      amount: 100000,
    });
    console.log({ newExpense });

    const reportFind = await Report.findById(reportRef);
    const newAmount = reportFind.currentAmount - amount;

    reportFind.currentAmount = newAmount;
    await reportFind.save();
    await newExpense.save();

    await db.disconnect();
    res.json({ msj: "Gasto cargado correctamente", expense: newExpense });
  } catch (error) {
    res.json({ msj: "Ocurrio un error", error });
  }
}

export default withAuth(handler);
