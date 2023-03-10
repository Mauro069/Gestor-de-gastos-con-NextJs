import { model, Schema, Document } from "mongoose";

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

export default model<IExpenseType>("ExpenseType", ExpenseTypeSchema);
