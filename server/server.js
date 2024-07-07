// server/server.js
const fs = require("fs");
const app = require("./app");
const http = require("https");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./db");

const PORT = process.env.PORT || 3000;

const server = http.createServer(
  {
    cert: fs.readFileSync("./cert.pm"),
    key: fs.readFileSync("./key.pm"),
  },
  app
);

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on https://localhost:${PORT}`);
});

// CREATING SELF SIGNED CERTIFICATE
//  openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pm -out cert.pm -days 365
