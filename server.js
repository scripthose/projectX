const express = require("express");
const bodyParser = require("body-parser");

const config = require('./config');
const IndexRoute = require('./routes');

const app = express();

// for serving static files
app.use(express.static(config.PUBLIC_URL));

// use bodyParser to parse json and request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup...
app.set("view engine", "ejs");
app.set("views", config.PUBLIC_URL);

// Routes
app.use(IndexRoute);

// start listening...
app.listen(config.PORT, () =>
  console.log("\x1b[36m", `Open ${config.BASE_URL}`)
);
