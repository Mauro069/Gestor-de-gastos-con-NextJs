// @ts-ignore
import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface IUser {
  _id?: ObjectId | string | undefined;
  email: string;
  password: string;
  firstname?: string;
  lastname?: string;
}

export interface IUserSchema extends Document {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  createdAt?: string;
  updatedAt?: string;
}

const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
