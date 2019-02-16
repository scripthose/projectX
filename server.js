const logger = require('morgan');
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const createError = require('http-errors');

const config = require('./config');
const IndexRoute = require('./routes');
const APIRouter = require('./routes/api');

const app = express();

// for serving static files
app.use(express.static(config.PUBLIC_URL));

// Logger
app.use(logger('dev'));

// use bodyParser to parse json and request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup...
app.set("view engine", "ejs");
app.set("views", config.PUBLIC_URL);

// Routes
app.use(IndexRoute);
app.use('/api', APIRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.status + " " + err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (req.url.includes('/api')) {
    res.json(err);
  } else {
    res.render('error');
  }
});

mongoose.connect(config.DB_URL, {useNewUrlParser: true}, () => {
  console.log('connected to the Database');
  require('./models/model');
});

// start listening...
app.listen(config.PORT, () =>
  console.log("\x1b[36m", `Open ${config.BASE_URL}`)
);
