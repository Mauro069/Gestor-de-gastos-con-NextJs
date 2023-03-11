import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IReport {
  _id: ObjectId | string;
  userRef: ObjectId | string;
  month: string;
  initialMoney: number;
  currentAmount?: number;
}

export interface IReportSchema extends Document {
  _id: ObjectId;
  userRef: ObjectId;
  month: string;
  initialMoney: number;
  currentAmount?: number;
  createdAt?: string;
  updatedAt?: string;
}

const ReportSchema: Schema = new Schema(
  {
    userRef: { type: Schema.Types.ObjectId, ref: "User" },
    month: { type: String, required: true },
    initialMoney: { type: Number, required: true },
    currentAmount: { type: Number },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Report = mongoose.models.Report || mongoose.model("Report", ReportSchema);
export default Report;
