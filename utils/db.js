import mongoose from "mongoose";

export async function connectDB() {
          try {
                    await mongoose.connect("mongodb://localhost:27017/gator");
          } catch (err) {
                    console.error(`Error connecting to DB: ${err}`);
                    process.exit(1);
          }
}

export async function disconnectDB() {
          try {
              await mongoose.disconnect();
              console.log('MongoDB connection closed');
          } catch (err) {
              console.error(`Error disconnecting from DB: ${err}`);
          }
}