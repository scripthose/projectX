const Router = require('express').Router();

// routes
const employee = require('./employee');
const exporter = require('./exporter');
const storage = require('./storage');
const product = require('./product');

employee(Router);
exporter(Router);
storage(Router);
product(Router);

module.exports = Router;