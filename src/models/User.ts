// @ts-ignore
import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  email: string;
  password: string;
}

export interface IUserSchema extends Document {
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
