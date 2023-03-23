import { transformDateToISO } from "@/utils/transformDateToISO";
import { NextApiRequest, NextApiResponse } from "next";
import { getAmount } from "@/utils/getExpensesAmount";
import { getPercentage } from "@/utils/getPercentage";
import { withAuth } from "@/lib/withAuth";
import { verify } from "jsonwebtoken";
import Expense from "@/models/Expense";
import db from "@/utils/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { daysBody: days, prevWeekStart, prevWeekEnd } = req.body;

      const { gdi_cookie } = req.cookies;
      const cookie = verify(gdi_cookie!, process.env.JWT_SECRET!);

      await db.connect();
      const getExpensesByDate = async (date: string) => {
        // @ts-ignore
        // prettier-ignore
        const expenses = await Expense.find({ date: transformDateToISO(date, "start"), userRef: cookie?.data?._id })
        return expenses;
      };

      const expenses = await Promise.all(
        days.map(async (day: any) => {
          const expenses = await getExpensesByDate(day);
          return { expenses, date: day };
        })
      );

      const thisWeekExpenses = await Expense.find({
        date: {
          $gte: transformDateToISO(days[0], "start"),
          $lte: transformDateToISO(days[days.length - 1], "end"),
        },
        // @ts-ignore
        userRef: cookie?.data?._id,
      });

      const prevWeekExpenses = await Expense.find({
        date: {
          $gte: transformDateToISO(prevWeekStart, "start"),
          $lte: transformDateToISO(prevWeekEnd, "end"),
        },
        // @ts-ignore
        userRef: cookie?.data?._id,
      });

      const prevWeekExpensesAmount = getAmount(prevWeekExpenses);
      const thisWeekExpensesAmount = getAmount(thisWeekExpenses);

      const percentage = getPercentage(
        prevWeekExpensesAmount,
        thisWeekExpensesAmount
      );

      res
        .status(200)
        .json({ weekExpenses: expenses, thisWeekExpensesAmount, percentage });

      await db.disconnect();
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
