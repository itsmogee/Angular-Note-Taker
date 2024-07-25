// Will hold the express App
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");

const app = express();

mongoose
  .connect(
    "mongodb+srv://itsmogee:ibaUWe2p7hFTsYPD@cluster0.htavm0p.mongodb.net/node-angular?retryWrites=true&w=majority&appName=Cluster0",
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  );
  next();
});
app.use("/api/posts", postsRoutes);

module.exports = app;
