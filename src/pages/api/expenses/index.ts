import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/lib/withAuth";
import db from "@/utils/db";
import Expense from "@/models/Expense";
import { transformDateToISO } from "@/utils/transformDateToISO";
import { verify } from "jsonwebtoken";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { gdi_cookie } = req.cookies;
      const cookie = verify(gdi_cookie!, process.env.JWT_SECRET!);

      await db.connect();
      const newExpense = new Expense({
        // @ts-ignore
        userRef: cookie?.data?._id,
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
