import mongoose, { Schema, Document } from "mongoose";

export interface IExpenseType {
  _id: string;
  name: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

const ExpenseTypeSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ExpenseType =
  mongoose.models.ExpenseType ||
  mongoose.model("ExpenseType", ExpenseTypeSchema);
export default ExpenseType;
