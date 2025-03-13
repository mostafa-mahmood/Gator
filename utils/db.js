require("dotenv").config();
const mongoose = require("mongoose");

async function connectDB() {
          try {
                    await mongoose.connect(process.env.MONGO_URI);
                    console.log("connected to db successfully");
          } catch(err) {
                    console.error(`error connecting to db ${err}`);
                    process.exit(1);
          }
}

module.exports = {connectDB}