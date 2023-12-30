import mongoose, { Connection } from "mongoose";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/url_shortener";

const connectToDatabase = async (): Promise<Connection> => {
  const connection = await mongoose.connect(MONGODB_URI);
  const db = connection.connection;

  if (db.readyState === 1) console.log("Connected to MongoDB");

  return db;
};

export default connectToDatabase;
