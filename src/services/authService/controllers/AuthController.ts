import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/UserModel";
import { withErrorHandler } from "../../../utils/decorators";
import { generateToken } from "../../../utils/helpers";

class AuthService {
  //@ts-ignore
  @withErrorHandler()
  static async registerUser(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
    res.status(500).json({ error: "Failed to register user" });
  }

  //@ts-ignore
  @withErrorHandler()
  static async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = generateToken(user);

    res.status(200).json({ message: "Login successful", token });
    res.status(500).json({ error: "Login failed" });
  }
}

export default AuthService;
