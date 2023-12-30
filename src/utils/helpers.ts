import jwt from "jsonwebtoken";
import { UserDocument } from "../interfaces/User";

export const generateToken = (user: UserDocument) => {
  const JWT_SECRET = process.env.JWT_SECRET as string;

  const token = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "30d",
  });
  return token;
};
