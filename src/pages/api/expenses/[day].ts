import { getPreviousDay } from "@/utils/getPreviousDay";
import { NextApiRequest, NextApiResponse } from "next";
import Expense, { IExpense } from "@/models/Expense";
import { getAmount } from "@/utils/getExpensesAmount";
import { getPercentage } from "@/utils/getPercentage";
import { withAuth } from "@/lib/withAuth";
import { verify } from "jsonwebtoken";
import db from "@/utils/db";
import { getExpenseData } from "@/utils/getExpensesData";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { day } = req.query;
    const { gdi_cookie } = req.cookies;
    const cookie = verify(gdi_cookie!, process.env.JWT_SECRET!);

    try {
      await db.connect();
      const expenses: IExpense[] = await Expense.find({
        date: day,
        // @ts-ignore
        userRef: cookie?.data?._id,
      })
        .sort({ hour: 1 })
        .populate("type");

      const todayExpensesAmount = getAmount(expenses);
      // @ts-ignore
      const previousDay = getPreviousDay(day);
      const previousDayExpenses: IExpense[] = await Expense.find({
        date: previousDay,
        // @ts-ignore
        userRef: cookie?.data?._id,
      });
      const previousDayExpensesAmount = getAmount(previousDayExpenses);
      const percentage = getPercentage(
        previousDayExpensesAmount,
        todayExpensesAmount
      );

      await db.disconnect();
      res.json({
        expenses,
        todayExpensesAmount,
        percentage,
        graphicData: getExpenseData(expenses),
      });
    } catch (error) {
      res.json({ msj: "Ocurrio un error", error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
