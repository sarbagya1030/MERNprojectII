import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { strict } from "assert";

async function connect() {
  const uri = "mongodb://localhost:27017/ProjectII";

  mongoose.set("strictQuery", true);
  const db = await mongoose.connect(uri);
  console.log("Database Connected");
  return db;
}

export default connect;
