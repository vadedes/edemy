import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';
const morgan = require('morgan');
require('dotenv').config();
const mongoose = require('mongoose');

//create express app
const app = express();

//connect to database
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log('DB CONNECTED'))
  .catch((err) => console.log('DB Error', err));

//apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
//routes will have a prefix of /api -> route
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));

//port
const port = process.env.PORT || 8000;

//listen and log server running port
app.listen(port, () => console.log(`Server is running on ${port}`));
