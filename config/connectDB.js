const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DATABASE CONNECTED WITH SUCCESS");
  } catch (error) {
    console.log("DATABASE CONNECTION ERROR:", error.message);
  }
};

module.exports = connectDB;
