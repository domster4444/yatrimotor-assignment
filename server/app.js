//? config app
const express = require('express');
const compression = require('compression');
const fs = require('fs');
const app = express();
const multer = require('multer');
const winston = require('winston');
const path = require('path');

//? best for performance, it's responsible for compressing response from server
app.use(
  compression({
    level: 6,
    threshold: 100 * 1000, // dont compress if above 100kb

    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

global.appRoot = path.dirname(__filename);
app.use(express.static(path.join(appRoot, 'storage')));

//? it's responsible for creating a req res log file inside server folder
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'app.log' }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
});
app.use((req, res, next) => {
  logger.info(`Request received: ${req.method} ${req.url}`);
  next();
});

//? configure dot env, used to get variable value from .env file

//?config dotenv file
const dotenv = require('dotenv');
dotenv.config({ path: './configs/config.env' });

//?config cors (this is used for allowing which methods can be requested to this server and what origins are allowed)
const cors = require('cors');
app.use(
  cors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
  })
);

//?connect to db
const connectDB = require('./configs/database');
const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

//? cookie parser to read cookies, (not necessary for this assignment)
//?config cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//?config body-parser
app.use(express.json({ limit: '50mb' })); //? allow body parsing to be up to 50mb
app.use(express.urlencoded({ extended: true, limit: '50mb' })); //? allow body parsing to be up to 50mb

//? morgan configuration to check api req in terminal
//?config morgan
const morgan = require('morgan');
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//todo: routes import
const userRoute = require('./routes/userRoute');
const blogRoute = require('./routes/blogRoute');
app.use('/api/v1', userRoute);
app.use('/api/v1', blogRoute);

//? blog imgs are stored in storage
app.use('/storage', express.static(path.join(appRoot, 'storage')));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'server working fine',
  });
});

//?config globalErrorMiddleware for exceptional errors
const globalErrorMiddleware = require('./middlewares/globalErrorMiddleware');
app.use(globalErrorMiddleware);

module.exports = app;
