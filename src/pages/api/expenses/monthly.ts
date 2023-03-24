import { withAuth } from "@/lib/withAuth";
import Expense from "@/models/Expense";
import db from "@/utils/db";
import { getAmount } from "@/utils/getExpensesAmount";
import { getPercentage } from "@/utils/getPercentage";
import dayjs from "dayjs";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const { month }: any = req.query;

      // Validar que el mes sea válido (por ejemplo, en formato "YYYY-MM")
      if (!dayjs(month).isValid()) {
        return res.status(400).json({ message: "Invalid month format" });
      }

      const { gdi_cookie } = req.cookies;
      const cookie = verify(gdi_cookie!, process.env.JWT_SECRET!);

      await db.connect();

      const startOfMonth = dayjs(month).startOf("month").toISOString();
      const endOfMonth = dayjs(month).endOf("month").toISOString();

      const expenses = await Expense.find({
        date: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
        // @ts-ignore
        userRef: cookie?.data?._id,
      });

      const totalAmount = getAmount(expenses);

      // Agrupar los gastos por tipo de gasto y obtener la suma de cada uno
      const expensesByType = expenses.reduce((acc, expense) => {
        if (expense.type in acc) {
          acc[expense.type] += expense.amount;
        } else {
          acc[expense.type] = expense.amount;
        }
        return acc;
      }, {});

      // Encontrar el tipo de gasto con mayor cantidad gastada
      let maxExpenseType = "";
      let maxExpenseAmount = 0;
      for (const [type, amount] of Object.entries(expensesByType)) {
        // @ts-ignore
        if (amount > maxExpenseAmount) {
          maxExpenseType = type;
          // @ts-ignore
          maxExpenseAmount = amount;
        }
      }

      // Obtener los gastos del mes anterior
      const prevMonth = dayjs(month).subtract(1, "month").format("YYYY-MM");
      const startOfPrevMonth = dayjs(prevMonth).startOf("month").toISOString();
      const endOfPrevMonth = dayjs(prevMonth).endOf("month").toISOString();

      const prevMonthExpenses = await Expense.find({
        date: {
          $gte: startOfPrevMonth,
          $lte: endOfPrevMonth,
        },
        // @ts-ignore
        userRef: cookie?.data?._id,
      });

      const prevMonthTotalAmount = getAmount(prevMonthExpenses);

      // Calcular el porcentaje a diferencia del mes anterior
      const percentage = getPercentage(prevMonthTotalAmount, totalAmount);

      res.status(200).json({ totalAmount, maxExpenseType, maxExpenseAmount, percentage });

      await db.disconnect();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los gastos del mes", error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
