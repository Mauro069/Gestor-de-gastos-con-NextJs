import mongoose, { Schema, Document, Types } from "mongoose";
import { IExpenseType } from "./ExpenseType";
import { IUser } from "./User";

export interface IExpense extends Document {
  date: string;
  amount: number;
  description: string;
  type: Types.ObjectId | IExpenseType;
  userRef: Types.ObjectId | IUser;
  createdAt: string;
  updatedAt: string;
}

const ExpenseSchema: Schema = new Schema(
  {
    userRef: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    type: { type: Schema.Types.ObjectId, ref: "ExpenseType", required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Expense =
  mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
export default Expense;
