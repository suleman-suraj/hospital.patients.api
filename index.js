const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const cors = require("cors");

const usersRoute = require("./routes/usersRoute");
const patientsRoute = require("./routes/patientsRoute");

const app = express();
connectDB();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
// app.use(cors());
app.use(usersRoute);
app.use(patientsRoute);

//home route
app.get("/", (req, res) => {
  res.send("<h1>WELCOME TO PATIENTS DATABASE</h1>");
});

//The root route

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("server is running successfully", PORT);
});
