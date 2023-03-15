import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/lib/withAuth";
import Expense from "@/models/Expense";
import db from "@/utils/db";
import dayjs from "dayjs";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      //   const { startOfWeek, endOfWeek, startOfWeekPrev, endOfWeekPrev } =
      //     req.body;

      const week = dayjs().startOf("week").add(1, "day");
      const startOfWeek = week
        .startOf("week")
        .add(1, "day")
        .format("DD/MM/YYYY");
      const endOfWeek = dayjs()
        .endOf("week")
        .add(1, "day")
        .format("DD/MM/YYYY");

      const expenses = await Expense.find({
        date: { $gte: startOfWeek, $lte: endOfWeek },
      });
      const thisWeekAmount = expenses.reduce(
        (acc, expense) => acc + expense.amount,
        0
      );

      const prevWeek = dayjs().startOf("week");
      const startOfWeekPrev = prevWeek
        .startOf("week")
        .subtract(7, "days")
        .format("DD/MM/YYYY");
      const endOfWeekPrev = prevWeek
        .endOf("week")
        .subtract(6, "days")
        .format("DD/MM/YYYY");

      const expensesPrev: any = await Expense.find({
        date: {
          $gte: startOfWeekPrev,
          $lte: endOfWeekPrev,
        },
      });

      const prevWeekAmount = expensesPrev.reduce(
        (acc: any, expense: any) => acc + expense.amount,
        0
      );

      const dif = thisWeekAmount - prevWeekAmount;
      const percentageDif = (dif / prevWeekAmount) * 100;

      res.json({
        prevWeekAmount,
        thisWeekAmount,
        percentageDif: percentageDif.toFixed(2),
      });
    } catch (error) {
      res.json({ msj: "Ocurrio un error", error });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}

export default withAuth(handler);
