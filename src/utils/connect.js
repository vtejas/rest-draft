const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", false);

const DB_URI = process.env.DB_URI;

const connectDB = async () => {
  mongoose
    .connect(DB_URI)
    .then(() => console.log("Database connected!"))
    .catch(() => {
      console.log("Database stopped");
      process.exit(1);
    });
};

module.exports = connectDB;
