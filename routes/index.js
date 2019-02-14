const config = require('../config');

const router = require('express').Router();

router.get("/", (req, res) => {
  res.render("index", {
    baseUrl: config.BASE_URL,
    title: 'Home Page',
  });
});

router.get("/product", (req, res) => {
  res.render("product", {
    baseUrl: config.BASE_URL,
    title: 'Products',
  });
});

router.get("/store", (req, res) => {
  res.render("store", {
    baseUrl: config.BASE_URL,
    title: 'Stores',
  });
});

router.get("/supplier", (req, res) => {
  res.render("supplier", {
    baseUrl: config.BASE_URL,
    title: 'Suppliers',
  });
});

router.get("/store-keeper", (req, res) => {
  res.render("store-keeper", {
    baseUrl: config.BASE_URL,
    title: 'Store-Keppers',
  });
});

router.get("/price", (req, res) => {
  res.render("price", {
    baseUrl: config.BASE_URL,
    title: 'Prices',
  });
});

router.get("/report", (req, res) => {
  res.render("report", {
    baseUrl: config.BASE_URL,
    title: 'Reports',
  });
});

router.get("/docs", (req, res) => {
  res.render("document", {
    baseUrl: config.BASE_URL,
    title: 'Documentations',
  });
});


module.exports = router;
