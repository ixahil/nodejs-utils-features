import mongoose from "mongoose";

const dbURI = "mongodb://localhost:27017/dev";

const connectDB = async () => {
  const conn = await mongoose.connect(dbURI);
  console.log("Database:", conn.connection.host, conn.connection.port);
};

export default connectDB;
