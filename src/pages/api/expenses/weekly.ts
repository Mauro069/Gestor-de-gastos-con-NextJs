import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/lib/withAuth";
import { verify } from "jsonwebtoken";
import Expense from "@/models/Expense";
import db from "@/utils/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { daysBody: days } = req.body;
      const { gdi_cookie } = req.cookies;
      const cookie = verify(gdi_cookie!, process.env.JWT_SECRET!);
      

      const getExpensesByDate = async (date: string) => {
        // @ts-ignore
        // prettier-ignore
        const expenses = await Expense.find({ date, userRef: cookie?.data?._id })
        return expenses;
      };

      const expenses = await Promise.all(
        days.map(async (day: any) => {
          const expenses = await getExpensesByDate(day);
          return { expenses, date: day };
        })
      );

      res.status(200).json({ weekExpenses: expenses });
      // await db.disconnect();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los gastos de la semana", error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
