import mongoose, { Schema, Document, ObjectId } from "mongoose";

export enum ActivityType {
  Entry = "entry",
  Expense = "expense",
}

export interface IActivity {
  type: ActivityType;
  description?: string;
  // activityType: string;
  // paymentMethod?: string;
  userRef?: mongoose.Types.ObjectId;
  date: string;
  amount: number | string;
  _id?: mongoose.Types.ObjectId;
}

const ActivitySchema: Schema = new Schema({
  type: {
    type: String,
    enum: [ActivityType.Entry, ActivityType.Expense],
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  // activityType: {
  //   type: String,
  //   required: false,
  // },
  // paymentMethod: {
  //   type: String,
  //   required: false,
  // },
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Activity =
  mongoose?.models?.Activity ||
  mongoose.model<IActivity>("Activity", ActivitySchema);

export default Activity;
