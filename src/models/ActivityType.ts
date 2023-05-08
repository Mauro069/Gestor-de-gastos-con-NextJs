import mongoose, { Schema, Document } from "mongoose";
import { ActivityTypeEnum } from "./Activity";

export interface IActivityType extends Document {
  name: string;
  color?: string;
  icon?: string;
  type: ActivityTypeEnum;
}

const ActivityTypeSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String },
  icon: { type: String },
  type: { type: String, enum: Object.values(ActivityTypeEnum), required: true },
});

const ActivityTypeModel = mongoose.model<IActivityType>(
  "ActivityType",
  ActivityTypeSchema
);

export default ActivityTypeModel;
