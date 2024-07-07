// server/app.js
const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const exampleRoutes = require("./routes/exampleRoutes");
const { authenticate } = require("./middleware/authentication/authenticate");
const authRouter = require("./routes/authentication/authentication.router");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// parse application/json
app.use(bodyParser.json());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send({ message: "Working" });
});

app.get("/proteced", authenticate, (req, res) => {
  res.send({ message: "Proteced route" });
});

module.exports = app;
