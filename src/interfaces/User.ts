// src/interfaces/User.ts

import { Document } from "mongoose";

interface User {
  username: string;
  email: string;
  password: string;
  // Add other necessary fields here
}

export default User;

export interface UserDocument extends User, Document {}
