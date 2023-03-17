import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IExpenseType } from "./ExpenseType";
import { IUser } from "./User";

export interface IExpense {
  _id: string;
  date: string;
  amount: number;
  description: string;
  type: ObjectId | IExpenseType;
  userRef: ObjectId | IUser;
  hour: any;
  createdAt: string;
  updatedAt: string;
}

const ExpenseSchema: Schema = new Schema(
  {
    userRef: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    hour: { type: String },
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
