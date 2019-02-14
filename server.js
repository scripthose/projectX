const express = require("express");
const app = express();
const path = require("path");

const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "public")));

app.set(bodyParser.json);
app.set(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public"));

const port = process.env.PORT || 2254;
const host = process.env.host || "127.0.0.1";

app.listen(port, callback =>
  console.log("\x1b[36m", `Open http://${host}:${port}`)
);

(() => {
  app.get("/", (req, res) => {
    res.render("index");
  });
  app.get("/product", (req, res) => {
    res.render("product");
  });
  app.get("/store", (req, res) => {
    res.render("store");
  });
  app.get("/supplier", (req, res) => {
    res.render("supplier");
  });
  app.get("/store-keeper", (req, res) => {
    res.render("store-keeper");
  });
  app.get("/price", (req, res) => {
    res.render("price");
  });
  app.get("/report", (req, res) => {
    res.render("report");
  });
  app.get("/docs", (req, res) => {
    res.render("document");
  });
})();
