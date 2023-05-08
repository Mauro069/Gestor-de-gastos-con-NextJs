import mongoose, { Schema } from "mongoose";

export enum ActivityTypeEnum {
  ENTRY = "entry",
  EXPENSE = "expense",
}

export interface IActivity extends Document {
  type: Schema.Types.ObjectId;
  description?: string;
  activityType: ActivityTypeEnum;
  paymentMethod?: any;
  userRef: Schema.Types.ObjectId;
  date: string;
  amount: number;
}

const ActivityTypeSchema: Schema<IActivity> = new mongoose.Schema({
  type: { type: Schema.Types.ObjectId, ref: "ActivityType", required: true },
  description: { type: String },
  activityType: {
    type: String,
    enum: Object.values(ActivityTypeEnum),
    required: true,
  },
  paymentMethod: { type: String },
  userRef: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
});

const ActivityModel = mongoose.model<IActivity>("Activity", ActivityTypeSchema);

export default ActivityModel;
