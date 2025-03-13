require("dotenv").config();
const dbUtils = require("./utils/db");
const express = require("express");

const app = express();
dbUtils.connectDB();



const PORT = process.env.PORT;
const DOMAIN = process.env.DOMAIN;
app.listen(PORT,DOMAIN,() => {
          console.log(`server running on: http://${DOMAIN}:${PORT}`);
})