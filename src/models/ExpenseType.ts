import mongoose, { model, Schema, Document } from "mongoose";

export interface IExpenseType extends Document {
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
  mongoose.models.Report || mongoose.model("ExpenseType", ExpenseTypeSchema);
export default ExpenseType;
