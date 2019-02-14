const path = require("path");

const PORT = process.env.PORT || 2254;
const HOST = process.env.HOST || '127.0.0.1';
const BASE_URL = `http://${HOST}:${PORT}`;
const PUBLIC_URL = path.join(__dirname, "public");
const DB_URL = `mongodb://${HOST}/dashboard`;

module.exports = {
  PORT,
  HOST,
  BASE_URL,
  PUBLIC_URL,
  DB_URL,
}