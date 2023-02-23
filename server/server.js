import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
const morgan = require("morgan");
import cookieParser from "cookie-parser";
import csrf from "csurf";
// const bodyParser = require('body-parser');
require("dotenv").config();

const mongoose = require("mongoose");

//setup route middlewares
const csrfProtection = csrf({ cookie: true });
//const parseForm = bodyParser.urlencoded({ extended: false })

//create express app
const app = express();

//connect to database
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB Error", err));

//apply middlewares
app.use(cors());
app.use(express.json());
//csrf
// parse cookies
// we need this because "cookie" is true in csrfProtection
app.use(cookieParser());
app.use(morgan("dev"));

//routes
//routes will have a prefix of /api -> route
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

app.use(csrfProtection);

//csrf endpoint
app.get("/api/csrf-token", (req, res) => {
  //pass the csrfToken to the view
  res.json({ csrfToken: req.csrfToken() });
});

//port
const port = process.env.PORT || 8000;

//listen and log server running port
app.listen(port, () => console.log(`Server is running on ${port}`));
