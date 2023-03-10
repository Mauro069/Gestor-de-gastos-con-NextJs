import { model, Schema, Document, Types } from "mongoose";
import { IExpenseType } from "./ExpenseType";
import { IReport } from "./Report";

export interface IExpense extends Document {
  date: string;
  amount: number;
  description: string;
  type: Types.ObjectId | IExpenseType;
  reportRef: Types.ObjectId | IReport;
  createdAt: string;
  updatedAt: string;
}

const ExpenseSchema: Schema = new Schema(
  {
    date: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    type: { type: Schema.Types.ObjectId, ref: "ExpenseType", required: true },
    reportRef: { type: Schema.Types.ObjectId, ref: "Report", required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model<IExpense>("Expense", ExpenseSchema);
