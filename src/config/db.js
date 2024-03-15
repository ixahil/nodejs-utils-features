import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

const DBURI = process.env.DBURI;

const DBConnection = async () => {
  try {
    const conn = await mongoose.connect(DBURI);
    console.log(
      "DB Connected: " + conn.connection.host + ":" + conn.connection.port
    );
  } catch (error) {
    console.log(error.message);
  }
};

export default DBConnection;
