import mongoose, { Model } from "mongoose";
import { UserDocument } from "../../../interfaces/User";

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add other fields with their respective types and validations
});

// Create the UserModel with the defined schema and interface
const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  userSchema
);

export default UserModel;
