import mongoose from "mongoose";

async function connectDB() {
          try {
                    await mongoose.connect("mongodb://localhost:27017/gator");
          } catch (err) {
                    console.error(`Error connecting to DB: ${err}`);
                    process.exit(1);
          }
}

export default connectDB;